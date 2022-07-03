import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';
import { transportsSetup } from './common/helpers/logger.helper';
import { DatabaseService } from './database/database.service';

const bootstrap = async () => {
  const PORT = 3001;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ transports: transportsSetup() }),
  });
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const databaseService = app.get(DatabaseService);
  await databaseService.enableShutdownHooks(app);

  await app.listen(PORT);

  logger.log(`Server running on http://localhost:${PORT}`);
};

bootstrap();
