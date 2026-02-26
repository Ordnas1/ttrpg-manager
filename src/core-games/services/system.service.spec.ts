import { Test, TestingModule } from '@nestjs/testing';
import { SystemService } from './system.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { System } from '../entities/system.entity';
import { SystemMapperService } from '../dtos/system/system.mapper.service';

const systemRepositoryMock = {
  find: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: 'D&D 5e',
      edition: '5th Edition',
      publisher: 'Wizards of the Coast',
      description: 'A tabletop RPG system',
    },
    {
      id: 2,
      name: 'Pathfinder',
      edition: '2nd Edition',
      publisher: 'Paizo',
      description: 'An ORC-source RPG system',
    },
  ]),
  findOneBy: jest.fn().mockImplementation(({ id }) => {
    if (id === 2)
      return Promise.resolve({
        id: 2,
        name: 'Pathfinder',
        edition: '2nd Edition',
        publisher: 'Paizo',
        description: 'An ORC-source RPG system',
      });
    else return Promise.resolve(null);
  }),
  delete: jest.fn().mockResolvedValue(undefined),
};

describe('SystemService', () => {
  let service: SystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemService,
        {
          provide: getRepositoryToken(System),
          useValue: systemRepositoryMock,
        },
        SystemMapperService,
      ],
    }).compile();

    service = module.get<SystemService>(SystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of systems', async () => {
      const result = await service.findAll();
      expect(result).toEqual([
        {
          id: 1,
          name: 'D&D 5e',
          edition: '5th Edition',
          publisher: 'Wizards of the Coast',
          description: 'A tabletop RPG system',
        },
        {
          id: 2,
          name: 'Pathfinder',
          edition: '2nd Edition',
          publisher: 'Paizo',
          description: 'An ORC-source RPG system',
        },
      ]);
      expect(systemRepositoryMock.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a system by id', async () => {
      const result = await service.findOne(2);
      expect(result).toEqual({
        id: 2,
        name: 'Pathfinder',
        edition: '2nd Edition',
        publisher: 'Paizo',
        description: 'An ORC-source RPG system',
      });
    });
    it('should return null if system not found', async () => {
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });
  describe('remove', () => {
    it('should call delete on the repository', async () => {
      await service.remove(1);
      expect(systemRepositoryMock.delete).toHaveBeenCalledWith(1);
    });
  });
});
