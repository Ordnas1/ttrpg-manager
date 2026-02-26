import { Test, TestingModule } from '@nestjs/testing';
import { SystemController } from './system.controller';
import { SystemService } from '../services/system.service';
import { SystemMapperService } from '../dtos/system/system.mapper.service';
import { GetSystemDTO } from '../dtos/system/get-system.output';

const systemServiceMock = {
  findAll: jest.fn().mockReturnValue([
    {
      id: 1,
      name: 'D&D 5e',
      edition: '5th Edition',
      publisher: 'Wizards of the Coast',
      description: 'A tabletop RPG system',
    } as GetSystemDTO,
    {
      id: 2,
      name: 'Pathfinder',
      edition: '2nd Edition',
      publisher: 'Paizo',
      description: 'An open-source RPG system',
    } as GetSystemDTO,
  ]),
  findOne: jest.fn(),
  remove: jest.fn(),
};

describe('SystemController', () => {
  let controller: SystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemController, SystemMapperService],
      providers: [
        {
          provide: SystemService,
          useValue: systemServiceMock,
        },
      ],
    }).compile();

    controller = module.get<SystemController>(SystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of systems', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(systemServiceMock.findAll());
      expect(systemServiceMock.findAll).toHaveBeenCalled();
    });
  });
});
