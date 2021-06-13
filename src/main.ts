import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ServiceAccount} from "firebase-admin/lib/credential";
import {ConfigService} from "@nestjs/config";
import * as admin from 'firebase-admin';

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

  const configService: ConfigService = app.get(ConfigService);
  // Set the config options
  const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
    "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
    "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: "https://insat-events-default-rtdb.firebaseio.com/",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
    }),
  );

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
