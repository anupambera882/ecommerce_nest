import { IsString, IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter correct category' })
  category: Category;
}
