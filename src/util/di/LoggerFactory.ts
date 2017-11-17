import * as moment from 'moment';
import * as winston from 'winston';
import { CommonConfig } from '../../config/CommonConfig';

export const loggerFactory = (config: CommonConfig): winston.LoggerInstance => {
  return new winston.Logger(
    {
      transports: [
        new winston.transports.Console(
          {
            level: config.general.logLevel,
            timestamp: () => {
              return moment().format();
            },
            formatter: options => {
              return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message ? options.message : '')
                + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            },
          }
        )
      ]
    }
  );
};
