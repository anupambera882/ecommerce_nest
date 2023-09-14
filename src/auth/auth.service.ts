import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private bookModel: mongoose.Model<User>, private jwt: JwtService) { }

  async signup(createUserDto: CreateAuthDto): Promise<User> {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return new this.bookModel(createUserDto).save();
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
