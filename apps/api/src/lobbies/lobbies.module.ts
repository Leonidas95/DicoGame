import { Logger, Module } from '@nestjs/common';

import { RoundsModule } from './rounds/rounds.module';
import { PlayersModule } from './players/players.module';
import { LobbiesGateway } from './lobbies.gateway';
import { LobbiesService } from './lobbies.service';

@Module({
  imports: [RoundsModule, PlayersModule],
  providers: [LobbiesGateway, LobbiesService, Logger],
  exports: [LobbiesGateway],
})
export class LobbiesModule {}
