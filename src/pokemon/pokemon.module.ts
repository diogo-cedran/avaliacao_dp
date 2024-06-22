<<<<<<< HEAD
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import { PokemonService } from "./pokemon.service";
import { PokemonController } from "./pokemon.controller";
import { Pokemon, PokemonSchema } from "./pokemon.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    HttpModule, // Importando o HttpModule
  ],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
=======
// src/pokemon/pokemon.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon])],
    providers: [PokemonService],
    controllers: [PokemonController],
})
export class PokemonModule { }
>>>>>>> 2acd11f3402582334d61efa4f9d833378d8c43bb
