<<<<<<< HEAD
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PokemonModule } from "./pokemon/pokemon.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LogsModule } from "./logs/logs.module";
=======
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { LogsMiddleware } from './logs/logs.middleware';
>>>>>>> 2acd11f3402582334d61efa4f9d833378d8c43bb

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/pokemon"), // Conexão com MongoDB
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
