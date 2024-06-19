// src/pokemon/pokemon.controller.ts
import { Controller, Get, Post, Param, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('fetch')
  async fetchAndSavePokemons() {
    await this.pokemonService.fetchAndSavePokemons();
    return 'Pokemons fetched and saved successfully';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pokemonService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pokemonService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Pokemon>) {
    return this.pokemonService.update(id, updateData);
  }
}
