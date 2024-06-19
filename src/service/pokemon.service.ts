// src/pokemon/pokemon.service.ts
import { Injectable, HttpService, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    private readonly httpService: HttpService,
  ) {}

  async fetchAndSavePokemons() {
    const response = await firstValueFrom(
      this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=50')
    );
    const pokemons = response.data.results;

    for (const pokemon of pokemons) {
      const newPokemon = this.pokemonRepository.create(pokemon);
      await this.pokemonRepository.save(newPokemon);
    }
  }

  findAll() {
    return this.pokemonRepository.find();
  }

  findOne(id: number) {
    return this.pokemonRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const result = await this.pokemonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
  }

  async update(id: number, updateData: Partial<Pokemon>): Promise<Pokemon> {
    await this.pokemonRepository.update(id, updateData);
    return this.findOne(id);
  }
}
