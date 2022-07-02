import { Person } from '@prisma/client';

export class Player {
  private _id: string;
  private _username: string;
  private _person?: Person;
  private _score: number;
}
