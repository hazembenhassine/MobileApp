import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class FilterEventsDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, required: true })
    club: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, required: true })
    date: string;
}
