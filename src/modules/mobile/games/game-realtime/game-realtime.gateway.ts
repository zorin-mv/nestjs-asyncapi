import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AsyncApiService, AsyncApiSub } from 'nestjs-asyncapi';
import { Server, Socket } from 'socket.io';
import { WebsocketExceptionsFilter } from 'src/shared/error-filters/ws-error-filter';
import { GameSessionRealtimeDto } from './dto/game-session-realtime.dto';
import { GAME_REALTIME_EVENTS_TO_SERVER } from './game-realtime.constants';
import { GameRealtimeService } from './game-realtime.service';

@AsyncApiService({ serviceName: '/game' })
@WebSocketGateway({
  namespace: '/game',
  cors: {
    origin: '*',
  },
})
@UseFilters(WebsocketExceptionsFilter)
@UsePipes(new ValidationPipe({ transform: true }))
export class GameRealtimeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gameRealtimeService: GameRealtimeService) {}

  private logger: Logger = new Logger('GameRealtimeGateway');

  @WebSocketServer()
  private server: Server;

  @AsyncApiSub({
    channel: 'joinGameSession',
    summary: '',
    description: '',
    message: {
      name: 'joinGameSession',
      payload: {
        type: GameSessionRealtimeDto,
      },
    },
  })
  @SubscribeMessage(GAME_REALTIME_EVENTS_TO_SERVER.joinGameSession)
  async handleJoinGameSession(@MessageBody() data: GameSessionRealtimeDto, @ConnectedSocket() socket: Socket) {
    await this.gameRealtimeService.handleJoinGameSession(data, socket, this.server);
  }

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
