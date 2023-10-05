import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private readonly userRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async signup(createUserDto: CreateAuthDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(createUserDto);
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...updateUserDto })
      .whereInIds(id)
      .execute();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
