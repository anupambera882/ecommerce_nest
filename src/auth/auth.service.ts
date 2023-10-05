import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
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
  async findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async getUserByPk(pk: object): Promise<User> {
    return this.userRepository.createQueryBuilder().where(pk).getMany()[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...updateUserDto })
      .whereInIds(id)
      .execute();
  }

  async remove(id: number): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .softDelete()
      .whereInIds(id)
      .execute();
  }

  async login(user: LoginDto): Promise<LoginResponseDto> {
    const loginUser = await this.getUserByPk({ email: user.email });
    const { id, name, email, phone, role } = loginUser;
    if (loginUser && loginUser.password === user.password) {
      return {
        statusCode: 200,
        response: {
          token: this.jwtService.sign({ id: loginUser.id }),
          user: { id, name, email, phone, role },
        },
        message: 'User login successfully',
      };
    }
  }
}
