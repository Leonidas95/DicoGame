import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LanguagesModule } from './languages/languages.module';
import { PersonsModule } from './persons/persons.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, LanguagesModule, PersonsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
