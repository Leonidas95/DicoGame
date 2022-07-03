import { Injectable, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { LobbiesService } from './lobbies.service';
import { Lobby } from './lobby.class';
import { Player } from './players/player.class';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { RequestDto } from './dto/request.dto';

@Injectable()
@WebSocketGateway({ namespace: 'lobbies', cors: { origin: '*', methods: ['GET', 'POST'] } })
export class LobbiesGateway implements OnGatewayConnection {
  private readonly _logger: Logger;
  @WebSocketServer() private readonly _wss: Server;

  constructor(private readonly lobbiesService: LobbiesService) {
    this._logger = new Logger(this.constructor.name);
  }

  handleConnection(socket: Socket): void {
    this._logger.debug(`New connection [socketId:${socket.id}]`);

    // setup disconnecting event when socket connects
    socket.on('disconnecting', () => {
      this._close(socket);
    });
  }

  @SubscribeMessage('request')
  onRequest(@ConnectedSocket() socket: Socket, @MessageBody() request: RequestDto) {
    const { method, data } = request;
    this._logger.debug(`New request [${method}]`);

    switch (method) {
      case 'createLobby':
        return this.lobbiesService.createLobby(new CreateLobbyDto(data));
      case 'joinLobby':
        return this.lobbiesService.joinLobby(new JoinLobbyDto(data), socket);
    }
  }

  private _close(socket: Socket): void {
    this._logger.debug(`Socket is disconnecting [socketId:${socket.id}]`);
    const { lobby, player } = this._getLobbyAndPlayerFromSocket(socket);

    if (lobby?.closed) return;

    if (lobby && player) {
      socket
        .to(lobby.id)
        .emit('notification', { event: 'playerLeft', data: { id: player.id, displayName: player.displayName } });

      lobby.deletePlayer(socket.id);

      if (lobby.players.length === 0) {
        this._logger.debug(`Last socket in the lobby left, closing lobby [${lobby.id}]`);
        lobby.close();
      }

      socket.leave(lobby.id);
    }
  }

  private _getLobbyAndPlayerFromSocket(socket: Socket): { lobby?: Lobby; player?: Player } {
    const roomId = [...socket.rooms].find((socketRoomId) => socketRoomId !== socket.id);
    const lobby = this.lobbiesService.getLobby(roomId);
    const player = lobby?.players.find(({ id }) => id === socket.id);

    return { lobby, player };
  }
}
