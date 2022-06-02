import { Length, IsNotEmpty } from 'class-validator';

export class AuthSignInDto {
  @Length(2, 255)
  login: string;

  @IsNotEmpty()
  password: string;
}
