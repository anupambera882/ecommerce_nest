import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() id: number) {
    return this.authService.getUserByPk({ id });
  }

  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto): Promise<User> {
    return this.authService.signup(createAuthDto);
  }

  @Get('allUsers')
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.authService.getUserByPk({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/account/info:id')
  updateAccountInfo(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = updateUserDto;
    return this.authService.update({ id: +id }, userInfo);
    // return this.authService.getUserByPk({ id: +id });
  }

  @Delete('deleteAccount/:id')
  remove(@Param('id') id: string): Promise<User> {
    return this.authService.remove(+id);
  }
}
