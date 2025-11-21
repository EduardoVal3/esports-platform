import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  login: string; // nickname or email

  @IsString()
  @IsNotEmpty()
  password: string;
}
