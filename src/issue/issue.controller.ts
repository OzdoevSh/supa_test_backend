import {
  Controller, Get, Param, Query, Req,
} from '@nestjs/common';
import { LogService } from '../log/log.service';
import { Issue, IssuesService } from './issue.service';

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly logService: LogService,
  ) {}

  @Get()
  async getAll(@Query() query: {
    user?: string;
    repo?: string;
    limit?: number;
    offset?: number;
  }, @Req() req): Promise<Issue[]> {
    const {
      user, repo, limit, offset,
    } = query;
    const result = await this.measureAndLog(
      'get_all_issues',
      req.ip,
      () => this.issuesService.getAll(user, repo, limit, offset),
    );
    return result;
  }

  @Get(':number')
  async getOne(
    @Query() query: {
      user?: string;
      repo?: string;
    },
    @Param('number') number: number,
    @Req() req,
  ): Promise<Issue> {
    const { user, repo } = query;
    const result = await this.measureAndLog(
      'get_one_issue',
      req.ip,
      () => this.issuesService.getOne(user, repo, number),
    );
    return result;
  }

  private async measureAndLog<T>(
    requestType: string,
    ipAddress: string,
    operation: () => Promise<T>,
  ) {
    const startTime = Date.now();
    const result = await operation();
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    await this.logService.create(requestType, ipAddress, executionTime);
    return result;
  }
}
