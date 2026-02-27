import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  global: true,
  signOptions: { expiresIn: 3600 },
}));
