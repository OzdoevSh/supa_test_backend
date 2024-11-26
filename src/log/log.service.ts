import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from './log.schema';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private LogModel: Model<LogDocument>) {}

  async create(
    requestType: string,
    userIp: string,
    executionTime: number,
  ): Promise<Log> {
    const createdLog = new this.LogModel({
      requestType,
      userIp,
      executionTime,
    });
    await createdLog.save();
    return createdLog;
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<{ logs: Log[]; total: number }> {
    const [logs, total] = await Promise.all([
      this.LogModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.LogModel.countDocuments().exec(),
    ]);
    return { logs, total };
  }
}
