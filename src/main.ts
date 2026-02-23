//================
// Import
//================
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

const PORT = 3456;


//================
// Main
//================
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({
    origin: ["http://localhost:5173"], // client dev environment
  });

  await app.listen(PORT);
  console.log(`Nestjs server running at: http://localhost:${PORT}/`)
}
bootstrap();
