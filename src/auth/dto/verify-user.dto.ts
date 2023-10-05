import { IsNotEmpty, IsEmail } from 'class-validator';

export class VerifyUserDto {
  @IsNotEmpty()
  readonly otp: string | number;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}
