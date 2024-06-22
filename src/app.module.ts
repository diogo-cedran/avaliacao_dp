import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PokemonModule } from "./pokemon/pokemon.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LogsModule } from "./logs/logs.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/pokemon"), // Conexão com MongoDB
    PokemonModule,
    UsersModule,
    AuthModule,
    LogsModule,
  ],
})
export class AppModule {}
