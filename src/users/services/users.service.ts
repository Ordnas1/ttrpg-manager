import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDTO } from '../dto/user.output';
import { UserMapperService } from '../dto/user.mapper.service';
import { CreateUserDTO } from '../dto/user.input';

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

  async findByUsernameAndReturnEntity(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(
    createUserDTO: CreateUserDTO,
    hashedPassword: string,
  ): Promise<void> {
    const existingUser = await this.usersRepository.findOneBy({
      username: createUserDTO.username,
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const userEntity = this.userMapperService.mapCreateUserDTOToUserEntity(
      createUserDTO,
      hashedPassword,
    );

    try {
      await this.usersRepository.save(userEntity);
    } catch (error) {
      const exception = new InternalServerErrorException(
        'Failed to create user',
      );
      if (error instanceof Error) exception.cause = error;
      throw exception;
    }
  }
}
