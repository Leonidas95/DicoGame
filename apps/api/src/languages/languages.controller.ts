import { Controller, Get, Param } from '@nestjs/common';
import { Language } from '@prisma/client';

import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly service: LanguagesService) {}

  @Get()
  getLanguages(): Promise<Language[]> {
    return this.service.getLanguages();
  }

  @Get(':id')
  getLanguage(@Param('id') id: string): Promise<Language> {
    return this.service.getLanguage(id);
  }
}
