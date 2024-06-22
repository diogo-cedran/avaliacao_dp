import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Put,
  UseGuards,
} from "@nestjs/common";
import { PokemonService } from "./pokemon.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post("fetch")
  async fetchAndSavePokemons() {
    await this.pokemonService.fetchAndSavePokemons();
    return "Pokemons fetched and saved successfully";
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pokemonService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pokemonService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateData: UpdatePokemonDto) {
    return this.pokemonService.update(id, updateData);
  }
}
