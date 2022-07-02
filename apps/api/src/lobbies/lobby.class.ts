import { Round } from './rounds/round.class';

export class Lobby {
  private _id: string;
  private _key: string;
  private _name: string;
  private _maxPlayers: number;
  private _isPrivate: boolean;
  private _rounds: Round[];

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get key(): string {
    return this._key;
  }

  public set key(value: string) {
    this._key = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get maxPlayers(): number {
    return this._maxPlayers;
  }

  public set maxPlayers(value: number) {
    this._maxPlayers = value;
  }

  public get isPrivate(): boolean {
    return this._isPrivate;
  }

  public set isPrivate(value: boolean) {
    this._isPrivate = value;
  }

  public get rounds(): Round[] {
    return this._rounds;
  }

  public set rounds(value: Round[]) {
    this._rounds = value;
  }
}
