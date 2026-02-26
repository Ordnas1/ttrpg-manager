import { Injectable } from '@nestjs/common';
import { GetSystemDTO } from './get-system.output';
import { System } from 'src/core-games/entities/system.entity';

@Injectable()
export class SystemMapperService {
  entityToGetSystemDTO(entity: System): GetSystemDTO {
    const dto = new GetSystemDTO();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.edition = entity.edition;
    dto.publisher = entity.publisher;
    dto.description = entity.description;
    return dto;
  }
}
