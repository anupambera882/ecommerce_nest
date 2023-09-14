import { IsString, IsNotEmpty, IsEnum, IsOptional, IsEmail, IsAlpha, MinLength, MaxLength, Matches } from 'class-validator';
import { Role } from '../schemas/user.schema';


export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: number;

  @IsOptional()
  @IsEnum(Role, { message: 'Please enter correct role' })
  role: Role;
}
