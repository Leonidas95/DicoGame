import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { DefinitionModule } from './definition/definition.module';

@Module({
  imports: [DatabaseModule, DefinitionModule],
  controllers: [WordsController],
  providers: [WordsService],
  exports: [WordsService],
})
export class WordsModule {}
