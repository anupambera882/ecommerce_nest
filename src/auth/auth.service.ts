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

  async createUser(createUserDto: CreateAuthDto): Promise<any> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(createUserDto);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async getUserByPk(pk: object): Promise<User> {
    return (
      await this.userRepository.createQueryBuilder().where(pk).getMany()
    )[0];
  }

  async update(
    pk: object,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...updateUserDto })
      .where(pk)
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
    const { name, email, phone, role } = loginUser;
    if (loginUser && loginUser.password === user.password) {
      return {
        statusCode: 200,
        response: {
          token: this.jwtService.sign({ id: loginUser.id }),
          user: { id: 1, name, email, phone, role },
        },
        message: 'User login successfully',
      };
    }
  }
}
