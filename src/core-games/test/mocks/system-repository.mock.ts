export const createSystemRepositoryMock = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
});
