import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from './logs.service';
import { Log } from './logs.schema';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', async () => {
      const log = {
        route: req.url,
        method: req.method,
        responseTime: Date.now() - startTime,
        createdAt: new Date(),
      } as Log;
      await this.logsService.create(log);
    });

    next();
  }
}
