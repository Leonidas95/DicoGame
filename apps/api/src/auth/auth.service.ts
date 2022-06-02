import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Person } from '@prisma/client';

import { PersonsService } from '../persons/persons.service';
import { AuthBadCredentials, AuthEmailExists, AuthPersonUnauthorized, AuthUsernameExists } from './auth.exceptions';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly personsService: PersonsService, private readonly jwtService: JwtService) {}

  async signUp(dto: AuthSignUpDto) {
    const { email, username } = dto;

    if (await this.personsService.findPersonByEmail(email)) {
      throw new AuthEmailExists();
    }

    if (await this.personsService.findPersonByUsername(username)) {
      throw new AuthUsernameExists();
    }

    const person = await this.personsService.create(dto);

    return this.getToken(person.id);
  }

  async signIn(dto: AuthSignInDto) {
    const person = await this.personsService.findPersonByUsernameOrEmail(dto.login);

    if (!person) {
      throw new AuthBadCredentials();
    }

    if (!person.password || !(await this.personsService.verifyPassword(person.password, dto.password))) {
      throw new AuthBadCredentials();
    }

    return this.getToken(person.id);
  }

  async validate(id: string): Promise<Person> {
    const person = await this.personsService.findPersonById(id);

    if (!person) {
      throw new AuthPersonUnauthorized();
    }

    return person;
  }

  private createJwt(id: string): string {
    return this.jwtService.sign({ id });
  }

  private getToken(personId: string): { token: string } {
    return { token: this.createJwt(personId) };
  }
}
