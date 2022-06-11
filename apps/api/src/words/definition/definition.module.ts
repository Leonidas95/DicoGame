import { Module } from '@nestjs/common';

import { DefinitionService } from './definition.service';

@Module({
  providers: [DefinitionService],
})
export class DefinitionModule {}
