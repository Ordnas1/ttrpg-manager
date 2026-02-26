import { Test, TestingModule } from '@nestjs/testing';
import { SystemMapperService } from './system.mapper.service';

describe('SystemMapperService', () => {
  let service: SystemMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemMapperService],
    }).compile();

    service = module.get<SystemMapperService>(SystemMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should map System entity to GetSystemDTO', () => {
    const systemEntity = {
      id: 1,
      name: 'D&D 5e',
      edition: '5th Edition',
      publisher: 'Wizards of the Coast',
      description: 'A tabletop RPG system',
      releaseDate: new Date('2014-07-15'),
    };

    const expectedDTO = {
      id: 1,
      name: 'D&D 5e',
      edition: '5th Edition',
      publisher: 'Wizards of the Coast',
      description: 'A tabletop RPG system',
      releaseDate: new Date('2014-07-15'),
    };

    const result = service.entityToGetSystemDTO(systemEntity);
    expect(result).toEqual(expectedDTO);
  });
});
