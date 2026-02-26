import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UserMapperService } from './dto/user.mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserMapperService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
