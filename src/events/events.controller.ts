import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import {NewEventDto} from "./dto/new-event.dto";
import {UpdateEventDto} from "./dto/update-event.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  async addEvent(@Body() event: NewEventDto) {
    const generatedId = await this.eventService.insertEvent(event);
    return { id: generatedId };
  }

  @Get()
  async getAllEvents() {
    const events = await this.eventService.getEvents();
    return events;
  }

  @Get(':id')
  getClub(@Param('id') eventId: string) {
    return this.eventService.getSingleEvent(eventId);
  }

  @Patch(':id')
  async updateClub(
      @Param('id') eventId: string,
      @Body() event: UpdateEventDto,
  ) {
    await this.eventService.updateEvent(eventId, event);
    return null;
  }

  @Delete(':id')
  async removeClub(@Param('id') eventId: string) {
    await this.eventService.deleteEvent(eventId);
    return null;
  }
}
