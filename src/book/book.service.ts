import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { pagination } from './dto/query-params.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return new this.bookModel(createBookDto).save();
  }

  async findAll(query: pagination): Promise<Book[]> {
    const page = query.page || 1;
    const perPageLimit = query.pageLimit || 2;
    const skip = perPageLimit * (page - 1);
    return this.bookModel.find().skip(skip).limit(perPageLimit);
  }

  async findOne(id: string): Promise<Book> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter corrected id');
    }
    const book = this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter corrected id');
    }
    return this.bookModel.findByIdAndUpdate(
      id,
      { $set: updateBookDto },
      { new: true },
    );
  }

  async remove(id: string): Promise<Book> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter corrected id');
    }
    return this.bookModel.findByIdAndDelete(id);
  }
}
