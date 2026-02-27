import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
const bcryptMock = jest.mocked(bcrypt);

describe('HashService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a password', async () => {
    const password = 'myPassword';
    const hashedPassword = 'hashedPassword';
    const hashMock = bcryptMock.hash as jest.Mock;
    hashMock.mockResolvedValue(hashedPassword);

    const result = await service.hashPassword(password);
    expect(result).toBe(hashedPassword);
    expect(hashMock).toHaveBeenCalledWith(password, 10);
  });

  it('should compare passwords', async () => {
    const password = 'myPassword';
    const hashedPassword = 'hashedPassword';
    const compareMock = bcryptMock.compare as jest.Mock;
    compareMock.mockResolvedValue(true);

    const result = await service.comparePasswords(password, hashedPassword);
    expect(result).toBe(true);
    expect(compareMock).toHaveBeenCalledWith(password, hashedPassword);
  });
});
