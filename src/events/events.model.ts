import * as mongoose from 'mongoose';
import {Types} from "mongoose";
import {Club} from "../club/club.model";

export const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'CULTURE',
            'MUSIC',
            'ART',
            'TRAINING',
        ],
        required: true,
    },
    organizers: [{
        type: Types.ObjectId,
        ref: 'Club'
    }],
    coverImageId: {
        type: String,
        required: true,
    },
});

export interface Events extends mongoose.Document {
    title: string;
    description: string;
    price: string;
    date: string;
    place: string;
    category: string;
    organizers: Club[];
    coverImageId: string;
}
