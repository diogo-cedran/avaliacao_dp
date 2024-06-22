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
