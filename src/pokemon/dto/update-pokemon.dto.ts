import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePokemonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
