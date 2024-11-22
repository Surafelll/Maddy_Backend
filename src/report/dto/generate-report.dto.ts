// generate-report.dto.ts
import { IsDateString } from 'class-validator';

export class GenerateReportDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
