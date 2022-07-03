import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { CreateLobbyDto } from './dto/create-lobby.dto';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { Lobby } from './lobby.class';

@Injectable()
export class LobbiesService {
  private readonly _lobbies: Map<string, Lobby>;

  constructor() {
    this._lobbies = new Map();
  }

  public get lobbies(): Map<string, Lobby> {
    return this._lobbies;
  }

  getLobby(id: string): Lobby | undefined {
    if (!this._lobbies.has(id)) {
      return undefined;
    }

    return this._lobbies.get(id);
  }

  createLobby({ name, maxPlayers, isPrivate }: CreateLobbyDto) {
    const lobby = new Lobby(name, maxPlayers, isPrivate);

    lobby.on('close', () => {
      this._lobbies.delete(lobby.id);
    });

    this._lobbies.set(lobby.id, lobby);

    return lobby;
  }

  joinLobby(dto: JoinLobbyDto, socket: Socket) {
    const lobby = this.getLobby(dto.id);

    if (lobby) {
      lobby.addPlayer(socket, dto);
    }
  }
}
