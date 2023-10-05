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

  async signup(createUserDto: CreateAuthDto): Promise<any> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ ...createUserDto }])
      .execute();
  }
  findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.createQueryBuilder().whereInIds(id).getMany()[0];
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...updateUserDto })
      .whereInIds(id)
      .execute();
  }

  remove(id: number): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .softDelete()
      .whereInIds(id)
      .execute();
  }
}
