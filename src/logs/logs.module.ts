import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './logs.schema';
import { LogsService } from './logs.service';
import { LogsMiddleware } from './logs.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])
  ],
  providers: [LogsService],
})
export class LogsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
