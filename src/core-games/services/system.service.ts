import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { System } from '../entities/system.entity';
import { Repository } from 'typeorm';
import { SystemMapperService } from '../dtos/system/system.mapper.service';
import { GetSystemDTO } from '../dtos/system/get-system.output';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System) private systemRepository: Repository<System>,
    private systemMapper: SystemMapperService,
  ) {}

  async findAll(): Promise<GetSystemDTO[]> {
    const systems = await this.systemRepository.find();
    return systems.map((system) =>
      this.systemMapper.entityToGetSystemDTO(system),
    );
  }

  async findOne(id: number): Promise<System | null> {
    return this.systemRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.systemRepository.delete(id);
  }
}
