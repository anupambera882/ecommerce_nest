import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly plan_id: string;

  @ApiProperty()
  @IsString()
  readonly card_number?: string;

  @ApiProperty()
  readonly exp_month?: string;

  @ApiProperty()
  readonly exp_year?: string;

  @ApiProperty()
  @IsString()
  readonly cvc?: string;

  @ApiProperty()
  @IsString()
  readonly total_users?: string;
}
