import { Module } from '@nestjs/common';

import { GameRealtimeGateway } from './game-realtime.gateway';
import { GameRealtimeService } from './game-realtime.service';

@Module({
  providers: [GameRealtimeGateway, GameRealtimeService],
})
export class GameRealtimeModule {}
