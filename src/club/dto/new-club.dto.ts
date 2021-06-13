import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class NewClubDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    name: string;
}
