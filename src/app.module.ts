import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {ClubModule} from "./club/club.module";
import { EventsModule } from './events/events.module';
import { FilesModule } from './files/files.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        UserModule,
        AuthModule,
        ClubModule,
        EventsModule,
        FilesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
