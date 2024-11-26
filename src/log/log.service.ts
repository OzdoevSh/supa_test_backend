import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { handleHttpError } from 'src/utils/httpErrorHandler';
import { Log, LogDocument } from './log.schema';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(@InjectModel(Log.name) private LogModel: Model<LogDocument>) {}

  async create(
    requestType: string,
    userIp: string,
    executionTime: number,
  ): Promise<Log> {
    try {
      const createdLog = new this.LogModel({
        requestType,
        userIp,
        executionTime,
      });
      await createdLog.save();
      return createdLog;
    } catch (error) {
      handleHttpError(this.logger, error);
      return null;
    }
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<{ logs: Log[]; total: number }> {
    try {
      const [logs, total] = await Promise.all([
        this.LogModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .exec(),
        this.LogModel.countDocuments().exec(),
      ]);
      return { logs, total };
    } catch (error) {
      handleHttpError(this.logger, error);
      return {
        logs: [],
        total: null,
      };
    }
  }
}
