import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { LogsMiddleware } from './logs/logs.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'nest',
      password: 'nest',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PokemonModule,
    UsersModule,
    AuthModule,
    LogsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
