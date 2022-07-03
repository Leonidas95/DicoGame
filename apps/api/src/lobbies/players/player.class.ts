import { Person } from '@prisma/client';
import { Socket } from 'socket.io';

export class Player {
  private readonly _id: string;
  private readonly _socket: Socket;
  private readonly _displayName: string;
  private _person?: Person;
  private _score: number;

  constructor(socket: Socket, { displayName }) {
    this._id = socket.id;
    this._socket = socket;
    this._displayName = displayName;
  }

  public get id(): string {
    return this._id;
  }

  public get socket(): Socket {
    return this._socket;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public get score(): number {
    return this._score;
  }

  public set score(value: number) {
    if (value < 0) {
      this._score = 0;
    } else {
      this._score = value;
    }
  }
}
