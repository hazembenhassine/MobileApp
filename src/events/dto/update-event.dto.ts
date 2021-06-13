import {IsEnum, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Category} from "./category.enum";

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, required: true })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, required: true })
    description: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, required: true })
    price: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, required: true })
    date: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, required: true })
    place: string;

    @IsString()
    @IsOptional()
    @IsEnum(Category)
    @ApiProperty({ enum: Category, required: true })
    category: string;
}
