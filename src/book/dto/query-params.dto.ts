import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class pagination {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  public page?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  public pageLimit: number;
}
