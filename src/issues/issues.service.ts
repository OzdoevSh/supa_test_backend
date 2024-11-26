import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

interface Issue {
  id: number;
  title: string;
  number: number;
}

@Injectable()
export class IssuesService {
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
    const url = `${this.configService.get<string>(
      'GITHUB_API_URL',
    )}/repos/${user}/${repo}/issues?per_page=${limit}&page=${offset}`;
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }

  async getOne(user: string, repo: string, number: number): Promise<Issue> {
    const url = `${this.configService.get<string>(
      'GITHUB_API_URL',
    )}/repos/${user}/${repo}/issues/${number}`;
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }
}
