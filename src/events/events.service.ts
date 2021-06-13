import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Events} from "./events.model";
import {NewEventDto} from "./dto/new-event.dto";
import {UpdateEventDto} from "./dto/update-event.dto";
import {Club} from "../club/club.model";
import {ClubService} from "../club/club.service";
import {FilterEventsDto} from "./dto/filter-events.dto";

@Injectable()
export class EventsService {
    constructor(@InjectModel('Events') private readonly eventModel: Model<Events>,
                private readonly clubService: ClubService) {
    }

    async insertEvent(event: NewEventDto) {
        // let organizers = [];
        // for (const o of event.organizers) {
        //     const club = await this.clubService.getSingleClub(o);
        //     organizers.push(club);
        // }
        const newEvent = new this.eventModel({
            title: event.title,
            description: event.description,
            price: event.price,
            date: event.date,
            place: event.place,
            category: event.category,
            organizers: event.organizers,
            coverImageId: event.coverImageId
        });
        const result = await newEvent.save();
        return result.id as string;
    }

    async getEvents() {
        const events = await this.eventModel.find().populate('organizers').exec();
        console.log(events);
        return events.map((event) => ({
            id: event.id,
            title: event.title,
            description: event.description,
            price: event.price,
            date: event.date,
            place: event.place,
            category: event.category,
            organizers: event.organizers,
            coverImageId: event.coverImageId
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
            coverImageId: event.coverImageId,
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

    async getFilteredEvents(filter: FilterEventsDto) {
        let events: { date: string; coverImageId: any; price: string; organizers: Club[]; description: string; id: any; place: string; title: string; category: string }[] = await this.getEvents();
        return events
            .filter(e => {
                if (filter.club) {
                    return this.isInOrganizers(filter.club, e.organizers)
                }
            })
            .filter(e => {
                if (filter.date) {
                    const filterDate = new Date(filter.date);
                    return new Date(e.date) > filterDate;
                }
            })

    }

    isInOrganizers(club, organizers: any[]) {
        let o: any;
        for (o in organizers) {
            if (o.name === club) {
                return true
            }
        }
        return false
    }
}
