import { Injectable } from '@nestjs/common';
import { GetUserDTO } from './user.output';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from './user.input';

@Injectable()
export class UserMapperService {
  mapUserEntityToGetUserDTO(user: User): GetUserDTO {
    const getUserDTO = new GetUserDTO();
    getUserDTO.id = user.id;
    getUserDTO.username = user.username;
    getUserDTO.email = user.email;
    return getUserDTO;
  }

  mapCreateUserDTOToUserEntity(
    createUserDTO: CreateUserDTO,
    hashedPassword: string,
  ): User {
    const userEntity = new User();
    userEntity.username = createUserDTO.username;
    userEntity.email = createUserDTO.email;
    userEntity.passwordHash = hashedPassword;
    return userEntity;
  }
}
