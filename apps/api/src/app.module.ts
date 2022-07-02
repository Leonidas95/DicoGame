import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LanguagesModule } from './languages/languages.module';
import { PersonsModule } from './persons/persons.module';
import { AuthModule } from './auth/auth.module';
import { WordsModule } from './words/words.module';
import { LobbiesModule } from './lobbies/lobbies.module';

@Module({
  imports: [DatabaseModule, LanguagesModule, PersonsModule, AuthModule, WordsModule, LobbiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
