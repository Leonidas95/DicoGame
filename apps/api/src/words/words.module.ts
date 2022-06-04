import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WordsController],
  providers: [WordsService],
  exports: [WordsService],
})
export class WordsModule {}
