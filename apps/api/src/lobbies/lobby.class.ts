import { Logger } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Socket } from 'socket.io';

import { Player } from './players/player.class';
import { Round } from './rounds/round.class';
import { JoinLobbyDto } from './dto/join-lobby.dto';

export class Lobby extends EventEmitter {
  private readonly _logger: Logger;
  private readonly _id: string;
  private _closed: boolean;
  private _name: string;
  private _maxPlayers: number;
  private _isPrivate: boolean;
  private _rounds: Round[];
  private _players: Player[];

  constructor(name: string, maxPlayers: number, isPrivate: boolean) {
    super();
    this._logger = new Logger(this.constructor.name);
    this.setMaxListeners(Infinity);
    this._id = Math.random().toString(36).substring(2, 7).toLowerCase();
    this._closed = false;
    this._name = name;
    this._maxPlayers = maxPlayers;
    this._isPrivate = isPrivate;
    this._rounds = [];
    this._players = [];
    this._logger.debug(`New Lobby [${this._id}]`);
  }

  public get id(): string {
    return this._id;
  }

  public get closed(): boolean {
    return this._closed;
  }

  public set closed(value: boolean) {
    this._closed = value;
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

  public get players(): Player[] {
    return this._players;
  }
  public set players(value: Player[]) {
    this._players = value;
  }

  close() {
    this._logger.debug(`Lobby [${this._id}] closed`);
    this._closed = true;
    this.emit('closed');
  }

  addPlayer(data: JoinLobbyDto, socket: Socket) {
    this._logger.debug(`New player [${socket.id}] in lobby [${this._id}]`);
    socket.join(this._id);

    this._players.push(new Player(socket, data));
  }

  deletePlayer(playerId: string) {
    this._logger.debug(`Player [${playerId}] in lobby [${this._id}] left`);
    const index = this._players.findIndex(({ id }) => playerId === id);

    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }
}
