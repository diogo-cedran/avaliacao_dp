<<<<<<< HEAD
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
=======
// src/pokemon/pokemon.controller.ts
import { Controller, Get, Post, Param, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

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
>>>>>>> 2acd11f3402582334d61efa4f9d833378d8c43bb
}
