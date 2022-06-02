import { Module } from '@nestjs/common';

import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
