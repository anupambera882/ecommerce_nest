import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter correct category' })
  category: Category;
}
