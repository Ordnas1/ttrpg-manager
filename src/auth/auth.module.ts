import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { HashService } from './services/hash.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtConfig.asProvider())],
  providers: [AuthService, HashService],
  controllers: [AuthController],
  exports: [AuthService, HashService],
})
export class AuthModule {}
