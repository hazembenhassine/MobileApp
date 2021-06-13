import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {EventSchema} from "./events.model";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Events', schema: EventSchema}])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
