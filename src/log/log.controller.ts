import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';

interface LogsQuery {
  page?: number;
  limit?: number;
}

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getAll(@Query() query: LogsQuery) {
    const { page, limit } = query;
    const res = await this.logService.getAll(page, limit);
    return res;
  }
}
