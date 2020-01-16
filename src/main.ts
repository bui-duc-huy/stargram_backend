import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000
  await app.listen(port);
  console.log("SERVER IS RUNNING IN PORT 4000")
}
bootstrap();
