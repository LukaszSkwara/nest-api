import { Injectable, NestMiddleware, MiddlewareFunction, LoggerService } from '@nestjs/common';

const reset = '\x1b[0m';
const fgBlack = '\x1b[30m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';
const bgRed = '\x1b[41m';
const bgGreen = '\x1b[42m';
const bgYellow = '\x1b[43m';
const bgBlue = '\x1b[44m';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      const start = new Date();

      res.once('finish', () => {
        const time =  Date.now() - start.getTime();
        const statusColor = res.statusCode < 400 ? bgGreen :
          res.statusCode >= 500 ? bgRed : bgYellow;
        // tslint:disable-next-line:no-console
        console.log(`${start.toISOString()} [${req.method}] ${
          statusColor} ${fgBlack}${res.statusCode} ${reset} - ${req.originalUrl} ${fgYellow}+${time}ms${reset}`);
      });
      next();
    };
  }
}
