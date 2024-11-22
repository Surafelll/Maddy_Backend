import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateReportDto } from './dto/generate-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async generateReport(dto: GenerateReportDto) {
    const { startDate, endDate } = dto;

    // Validate date range
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException('Start date must be before end date');
    }

    // Fetch all products sold within the date range
    const sales = await this.prisma.sale.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select: {
        price: true,
        quantity: true,
      },
    });

    // Calculate total sales
    const totalSales = sales.reduce((sum, sale) => sum + sale.price * sale.quantity, 0);

    // Store report in the database
    const report = await this.prisma.report.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalSales,
      },
    });

    return report;
  }

  async getReports() {
    return this.prisma.report.findMany();
  }
}
