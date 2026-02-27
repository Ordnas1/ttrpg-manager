import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LogInDTO } from '../dto/login.input';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from 'src/users/dto/user.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() loginInput: LogInDTO) {
    return this.authService.logIn(loginInput.username, loginInput.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() createUserDTO: CreateUserDTO) {
    await this.authService.signUp(createUserDTO);
  }
}
