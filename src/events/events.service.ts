import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Events} from "./events.model";
import {NewEventDto} from "./dto/new-event.dto";
import {UpdateEventDto} from "./dto/update-event.dto";

@Injectable()
export class EventsService {
    constructor(@InjectModel('Events') private readonly eventModel: Model<Events>) {
    }

    async insertEvent(event: NewEventDto) {
        const newEvent = new this.eventModel({
            title: event.title,
            description: event.description,
            price: event.price,
            date: event.date,
            place: event.place,
            category: event.category
        });
        const result = await newEvent.save();
        return result.id as string;
    }

    async getEvents() {
        const events = await this.eventModel.find().exec();
        return events.map((event) => ({
            id: event.id,
            title: event.title,
            description: event.description,
            price: event.price,
            date: event.date,
            place: event.place,
            category: event.category,
        }));
    }

    async getSingleEvent(eventId: string) {
        const event = await this.findEvent(eventId);
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            price: event.price,
            date: event.date,
            place: event.place,
            category: event.category,
        };
    }

    async updateEvent(eventId: string, event: UpdateEventDto) {
        const updatedEvent = await this.eventModel.findByIdAndUpdate(
            eventId,
            {...event},
            {new: true}
        );
        if (!updatedEvent) {
            throw new NotFoundException(`Event ${eventId} not found`);
        }
    }

    async deleteEvent(eventId: string) {
        const result = await this.eventModel.deleteOne({_id: eventId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find event.');
        }
    }

    private async findEvent(id: string): Promise<Events> {
        let event;
        try {
            event = await this.eventModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find event.');
        }
        if (!event) {
            throw new NotFoundException('Could not find event.');
        }
        return event;
    }
}
