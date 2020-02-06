import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  await app.listen(port);

  if (module.hot){
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  Logger.log(`Server is running in port ${port}`)

}
bootstrap();
