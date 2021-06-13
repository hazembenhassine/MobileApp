import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClubService } from './club.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {NewClubDto} from "./dto/new-club.dto";

@ApiTags('Club')
@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @ApiBody({type: NewClubDto})
  async addClub(@Body() club: NewClubDto) {
    const generatedId = await this.clubService.insertClub(club);
    return { id: generatedId };
  }

  @Get()
  async getAllClubs() {
    const clubs = await this.clubService.getClubs();
    return clubs;
  }

  @Get(':id')
  getClub(@Param('id') clubId: string) {
    return this.clubService.getSingleClub(clubId);
  }

  @Patch(':id')
  async updateClub(
    @Param('id') clubId: string,
    @Body('name') clubName: string,
  ) {
    await this.clubService.updateClub(clubId, clubName);
    return null;
  }

  @Delete(':id')
  async removeClub(@Param('id') clubId: string) {
    await this.clubService.deleteClub(clubId);
    return null;
  }
}
