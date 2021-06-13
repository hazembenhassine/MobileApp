import {Module} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventsController} from './events.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {EventSchema} from "./events.model";
import {ClubService} from "../club/club.service";
import {ClubSchema} from "../club/club.model";

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Events', schema: EventSchema},
        {name: 'Club', schema: ClubSchema}
    ])],
    controllers: [EventsController],
    providers: [EventsService, ClubService]
})
export class EventsModule {
}
