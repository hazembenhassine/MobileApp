import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club } from './club.model';
import {NewClubDto} from "./dto/new-club.dto";

@Injectable()
export class ClubService {
  constructor(@InjectModel('Club') private readonly clubModel: Model<Club>) {}

  async insertClub(club: NewClubDto) {
    const newClub = new this.clubModel({
      name: club.name,
      logoImageId: club.logoImageId,
    });
    const result = await newClub.save();
    return result.id as string;
  }

  async getClubs() {
    const clubs = await this.clubModel.find().exec();
    return clubs.map((club) => ({
      id: club.id,
      name: club.name,
      logoImageId: club.logoImageId
    }));
  }

  async getSingleClub(clubId: string) {
    const club = await this.findClub(clubId);
    return {
      id: club.id,
      name: club.name,
      logoImageId: club.logoImageId
    };
  }

  async updateClub(clubId: string, name: string) {
    const updatedClub = await this.findClub(clubId);
    if (name) {
      updatedClub.name = name;
    }
    // if (desc) {
    //   updatedProduct.description = desc;
    // }
    // if (price) {
    //   updatedProduct.price = price;
    // }
    await updatedClub.save();
  }

  async deleteClub(clubId: string) {
    const result = await this.clubModel.deleteOne({ _id: clubId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find club.');
    }
  }

  private async findClub(id: string): Promise<Club> {
    let club;
    try {
      club = await this.clubModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find club.');
    }
    if (!club) {
      throw new NotFoundException('Could not find club.');
    }
    return club;
  }
}
