import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameSessionRealtimeDto } from './dto/game-session-realtime.dto';

@Injectable()
export class GameRealtimeService {
  async handleJoinGameSession({ userId, gameSessionId }: GameSessionRealtimeDto, socket: Socket, server: Server) {
    return '';
  }
}
