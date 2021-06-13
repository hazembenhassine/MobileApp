import * as mongoose from 'mongoose';

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
});

export interface Events extends mongoose.Document {
    title: string;
    description: string;
    price: string;
    date: string;
    place: string;
    category: string;
}
