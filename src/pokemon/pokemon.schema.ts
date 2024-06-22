import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
