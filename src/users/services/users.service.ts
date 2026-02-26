import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDTO } from '../dto/user.output';
import { UserMapperService } from '../dto/user.mapper.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private userMapperService: UserMapperService,
  ) {}

  async findUserByUsename(username: string): Promise<GetUserDTO | null> {
    const user = await this.usersRepository.findOneBy({ username });
    if (user) {
      return this.userMapperService.mapUserEntityToGetUserDTO(user);
    }
    return null;
  }
}
