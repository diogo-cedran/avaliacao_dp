// src/logs/logs.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from './logs.service';
import { Log } from './log.entity';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', async () => {
      const log = new Log();
      log.route = req.url;
      log.method = req.method;
      log.responseTime = Date.now() - startTime;
      await this.logsService.create(log);
    });

    next();
  }
}
