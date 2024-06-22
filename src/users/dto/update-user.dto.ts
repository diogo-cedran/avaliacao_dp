import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;
}
