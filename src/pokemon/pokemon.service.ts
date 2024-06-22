import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pokemon } from "./pokemon.schema";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly httpService: HttpService
  ) {}

  async fetchAndSavePokemons() {
    const response: { data: { results: Pokemon[] } } = await firstValueFrom(
      this.httpService.get("https://pokeapi.co/api/v2/pokemon?limit=50")
    );
    const pokemons = response.data.results;

    for (const pokemon of pokemons) {
      const newPokemon = new this.pokemonModel(pokemon);
      await newPokemon.save();
    }
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonModel.find().exec();
  }

  async findOne(id: string): Promise<Pokemon> {
    return this.pokemonModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.pokemonModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
  }

  async update(id: string, updateData: UpdatePokemonDto): Promise<Pokemon> {
    return this.pokemonModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
