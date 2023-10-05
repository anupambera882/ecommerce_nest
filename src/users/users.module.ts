import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService],
  controllers: [],
  exports: [],
})
export class UsersModule {}
