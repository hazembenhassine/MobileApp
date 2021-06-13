import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Category} from "./category.enum";

export class NewEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    price: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    place: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Category)
    @ApiProperty({ enum: Category, required: true })
    category: string;
}
