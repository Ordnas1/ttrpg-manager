import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserMapperService } from 'src/users/dto/user.mapper.service';
import { HashService } from './hash.service';
import { UsersService } from 'src/users/services/users.service';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const userServiceMock = {
  findByUsernameAndReturnEntity: jest
    .fn()
    .mockImplementation((username: string) => {
      if (username === 'validUser') {
        return Promise.resolve({
          id: 1,
          username: 'validUser',
          passwordHash: 'hashedPassword',
        });
      } else {
        return Promise.resolve(null);
      }
    }),
};

const hashServiceMock = {
  comparePasswords: jest
    .fn()
    .mockImplementation((password: string, hashedPassword: string) => {
      if (password === 'validPassword' && hashedPassword === 'hashedPassword') {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    }),
};

const jwtServiceMock = {
  signAsync: jest.fn().mockResolvedValue('mockedAccessToken'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserMapperService,
        { provide: UsersService, useValue: userServiceMock },
        { provide: HashService, useValue: hashServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return NotFoundException if user is not found', async () => {
    await expect(service.logIn('invalidUser', 'anyPassword')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return UnauthorizedException if password is invalid', async () => {
    await expect(
      service.logIn('validUser', 'invalidPassword'),
    ).rejects.toThrow();
  });

  it('should return access token if credentials are valid', async () => {
    const result = await service.logIn('validUser', 'validPassword');
    expect(result).toHaveProperty('accessToken');
    expect(typeof result.accessToken).toBe('string');
  });
});
