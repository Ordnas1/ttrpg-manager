import { IsNotEmpty } from 'class-validator';

export class LogInDTO {
  @IsNotEmpty()
  username!: string;
  @IsNotEmpty()
  password!: string;
}
