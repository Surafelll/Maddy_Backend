import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  getReports(): string {
    return 'List of Reports';
  }
}
