import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { GenerateReportDto } from './dto/generate-report.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate a sales report' })
  async generateReport(@Body() dto: GenerateReportDto) {
    return this.reportService.generateReport(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  async getReports() {
    return this.reportService.getReports();
  }
}
