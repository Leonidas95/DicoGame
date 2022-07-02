import { Module } from '@nestjs/common';
import { RoundsModule } from './rounds/rounds.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [RoundsModule, PlayersModule],
})
export class LobbiesModule {}
