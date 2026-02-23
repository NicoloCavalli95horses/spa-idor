//================
// Import
//================
import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImagesModule } from './images/images.module';
import { FrontendFallbackMiddleware } from './frontend-fallback.middleware';


//================
// Class
//================
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client_dist'),
      exclude: ['/api/*path'],
    }),
    ImagesModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FrontendFallbackMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
