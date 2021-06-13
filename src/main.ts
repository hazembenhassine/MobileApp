import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  /*
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen(() => console.log('Microservice is listening'));
   */

  const config = new DocumentBuilder()
      .setTitle('insat events backend')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('events')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
