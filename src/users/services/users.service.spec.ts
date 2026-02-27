import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserMapperService } from '../dto/user.mapper.service';

const createUserRepositoryMock = () => ({
  findOneBy: jest.fn().mockImplementation(({ username }) => {
    if (username === 'existingUser') {
      const user = new User();
      user.username = 'existingUser';
      user.email = 'existingUser@example.com';
      user.passwordHash = 'hashedPassword';
      return user;
    } else return null;
  }),
});

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createUserRepositoryMock(),
        },
        UserMapperService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByUsename', () => {
    it('should return one user by username', async () => {
      const user = await service.findUserByUsename('existingUser');
      expect(user).toBeDefined();
      expect(user?.username).toBe('existingUser');
    });

    it('should return null if user does not exist', async () => {
      const user = await service.findUserByUsename('nonExistingUser');
      expect(user).toBeNull();
    });
  });
  describe('findByUsernameAndReturnEntity', () => {
    it('should return one user entity by username', async () => {
      const user = await service.findByUsernameAndReturnEntity('existingUser');
      expect(user).toBeDefined();
      expect(user?.username).toBe('existingUser');
    });

    it('should return null if user does not exist', async () => {
      const user =
        await service.findByUsernameAndReturnEntity('nonExistingUser');
      expect(user).toBeNull();
    });
  });
});
