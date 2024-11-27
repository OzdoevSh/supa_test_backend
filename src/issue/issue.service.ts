import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { handleHttpError } from 'src/utils/httpErrorHandler';

export interface Issue {
  id: number;
  title: string;
  number: number;
}
@Injectable()
export class IssuesService {
  private readonly logger = new Logger(IssuesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(
    user: string,
    repo: string,
    limit: number,
    offset: number,
  ): Promise<Issue[]> {
    try {
      const url = `${this.configService.get<string>(
        'GITHUB_API_URL',
      )}/repos/${user}/${repo}/issues?per_page=${limit}&page=${offset}`;
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      handleHttpError(this.logger, error);
      return [];
    }
  }

  async getOne(user: string, repo: string, number: number): Promise<Issue> {
    try {
      const url = `${this.configService.get<string>(
        'GITHUB_API_URL',
      )}/repos/${user}/${repo}/issues/${number}`;
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      handleHttpError(this.logger, error);
      return null;
    }
  }
}
