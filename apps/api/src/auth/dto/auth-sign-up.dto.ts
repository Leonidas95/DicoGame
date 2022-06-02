import { NotContains, Length, IsEmail, MaxLength, Matches } from 'class-validator';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export class AuthSignUpDto {
  @NotContains('@')
  @NotContains(' ')
  @Length(2, 30)
  username: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @Matches(PASSWORD_REGEX, { message: 'PASSWORD_INVALID_REQUIREMENTS' })
  password: string;
}
