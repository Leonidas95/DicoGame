import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { RequestDto } from './dto/request.dto';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { LobbiesService } from './lobbies.service';
import { Lobby } from './lobby.class';
import { Player } from './players/player.class';
import { JoinLobbyDto } from './dto/join-lobby.dto';

@WebSocketGateway({ namespace: 'lobbies' })
@Injectable()
export class LobbiesGateway implements OnGatewayConnection {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @WebSocketServer() private readonly _wss: Server;

  handleConnection(socket: Socket): void {
    // setup disconnecting event when socket connects
    socket.on('disconnecting', () => {
      this._close(socket);
    });
  }

  @SubscribeMessage('request')
  onRequest(@ConnectedSocket() socket: Socket, @MessageBody() request: RequestDto) {
    const { method, data } = request;

    switch (method) {
      case 'createLobby':
        return this.lobbiesService.createLobby(new CreateLobbyDto(data));
      case 'joinLobby':
        return this.lobbiesService.joinLobby(new JoinLobbyDto(data), socket);
    }
  }

  private _close(socket: Socket): void {
    const { lobby, player } = this._getLobbyAndPlayerFromSocket(socket);

    if (lobby.closed) return;

    socket
      .to(lobby.id)
      .emit('notification', { event: 'playerLeft', data: { id: player.id, displayName: player.displayName } });

    lobby.deletePlayer(socket.id);

    if (lobby.players.length === 0) {
      lobby.close();
    }

    socket.leave(lobby.id);
  }

  private _getLobbyAndPlayerFromSocket(socket: Socket): { lobby: Lobby; player: Player } {
    const roomId = [...socket.rooms].find((socketRoomId) => socketRoomId !== socket.id);
    const lobby = this.lobbiesService.getLobby(roomId);
    const player = lobby?.players.find(({ id }) => id === socket.id);

    return { lobby, player };
  }
}
