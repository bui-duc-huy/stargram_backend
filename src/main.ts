import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();

  await app.listen(port);

  if (module.hot){
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  Logger.log(`Server is running in port ${port}`)

}
bootstrap();
