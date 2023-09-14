import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}
@Schema({
  timestamps: true,
})
export class Book {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ enum: Category, required: true, default: Category.ADVENTURE })
  @IsEnum(Category)
  category: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
