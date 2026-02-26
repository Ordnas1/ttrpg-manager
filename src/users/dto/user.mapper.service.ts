import { Injectable } from '@nestjs/common';
import { GetUserDTO } from './user.output';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapperService {
  mapUserEntityToGetUserDTO(user: User): GetUserDTO {
    const getUserDTO = new GetUserDTO();
    getUserDTO.id = user.id;
    getUserDTO.username = user.username;
    getUserDTO.email = user.email;
    return getUserDTO;
  }
}
