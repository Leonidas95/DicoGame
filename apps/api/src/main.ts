import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const PORT = 3001;
  const logger = new Logger('EntryPoint');
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const databaseService = app.get(DatabaseService);
  await databaseService.enableShutdownHooks(app);

  await app.listen(PORT);

  logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
