import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './entity/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<LoginResponseDto> {
    if (
      (await this.authService.getUserByPk({ phone: createAuthDto.phone })) ||
      (await this.authService.getUserByPk({ email: createAuthDto.email }))
    )
      throw new BadRequestException('Login Your account', {
        cause: new Error(),
        description: 'User already exist',
      });
    const newUser = await this.authService.createUser(createAuthDto);
    return this.authService.login(newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@Body() user: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateAccount/:id')
  updateAccountInfo(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = updateUserDto;
    return this.authService.update({ id: +id }, userInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() id: number) {
    return this.authService.getUserByPk({ id });
  }

  @Get('allUsers')
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.authService.getUserByPk({ id });
  }

  @Delete('deleteAccount/:id')
  remove(@Param('id') id: string): Promise<User> {
    return this.authService.remove(+id);
  }
}
