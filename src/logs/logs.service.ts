import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './logs.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<Log>,
  ) {}

  async create(log: Log): Promise<Log> {
    const createdLog = new this.logModel(log);
    return createdLog.save();
  }
}
