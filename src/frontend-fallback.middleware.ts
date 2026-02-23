//================
// Import
//================
import { Injectable, NestMiddleware } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';


//================
// Middleware class
//================
@Injectable()
export class FrontendFallbackMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const url = req.url || '';

    // Handle all the APIs
    if (url.startsWith('/api')) {
      return next();
    }

    // Do not incercept static files
    if (/\.(css|js|png|jpg|jpeg|gif|svg|ico|txt|map|woff2?|ttf|eot)$/i.test(url)) {
      return next();
    }

    const indexPath = join(process.cwd(), 'client_dist', 'index.html');
    const stream = createReadStream(indexPath);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    stream.pipe(res);
  }
}
