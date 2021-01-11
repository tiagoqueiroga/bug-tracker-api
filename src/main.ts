import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const logger = new Logger('Bootstrap')
  const config = app.get(ConfigService)
  const port = parseInt(config.get<string>(SERVER_PORT))

  // Swagger
  initSwagger(app);

  //const document = SwaggerModule.createDocument(app, options);
  //SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
}
bootstrap();
