import { Controller, Get, Param } from '@nestjs/common';
import { Word } from '@prisma/client';

import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly service: WordsService) {}

  @Get()
  getWords(): Promise<Word[]> {
    return this.service.getWords();
  }

  @Get(':id')
  getWord(@Param('id') id: string): Promise<Word> {
    return this.service.getWord(id);
  }
}
