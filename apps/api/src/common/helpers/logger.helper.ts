import { LogLevel } from '@nestjs/common';
import { utilities } from 'nest-winston';
import { format, transports } from 'winston';

export const logLevels = (isProduction: boolean): LogLevel[] => {
  const levels: LogLevel[] = ['log', 'warn', 'error'];

  if (isProduction) {
    return levels;
  }
  return [...levels, 'debug'];
};

export const transportsSetup = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    return [
      new transports.Console({
        level: 'debug',
        format: format.combine(format.timestamp(), utilities.format.nestLike(), format.colorize({ all: true })),
      }),
    ];
  }

  return logLevels(isProduction).map(
    (level) =>
      new transports.File({
        filename: `logs/${level}.log`,
        format: format.combine(format.timestamp(), format.json()),
      }),
  );
};
