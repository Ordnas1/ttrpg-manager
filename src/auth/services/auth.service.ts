import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async logIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user =
      await this.usersService.findByUsernameAndReturnEntity(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatchPassword = await this.hashService.comparePasswords(
      password,
      user.passwordHash,
    );
    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  async signUp(createUSerDTO: CreateUserDTO): Promise<void> {
    const hashedPassword = await this.hashService.hashPassword(
      createUSerDTO.password,
    );
    await this.usersService.create(createUSerDTO, hashedPassword);
  }
}
