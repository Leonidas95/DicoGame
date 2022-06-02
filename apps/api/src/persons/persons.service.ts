import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class PersonsService {
  constructor(private databaseService: DatabaseService) {}

  async findPersonById(id: string) {
    return this.databaseService.person.findUnique({ where: { id } });
  }

  async findPersonByUsername(username: string) {
    return this.databaseService.person.findFirst({ where: { username } });
  }

  async findPersonByEmail(email: string) {
    return this.databaseService.person.findFirst({ where: { email } });
  }

  async findPersonByUsernameOrEmail(usernameOrEmail: string) {
    return this.databaseService.person.findFirst({
      where: { OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }] },
    });
  }

  async create({ email, password, username }: { email: string; password: string; username: string }) {
    const hashedPassword = await this.hashPassword(password);

    return this.databaseService.person.create({ data: { email, username, password: hashedPassword } });
  }

  async verifyPassword(hashedPassword: string, plainPassword: string) {
    return argon2.verify(hashedPassword, plainPassword);
  }

  private async hashPassword(password: string) {
    return argon2.hash(password);
  }
}
