import axios from 'axios';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.model';
import { ListingsRepository } from './listings.repository';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(ListingsRepository)
    private listingsRepository: ListingsRepository,
  ) {}

  async getListings(filterDto: GetListingsFilterDto): Promise<Listing[]> {
    return this.listingsRepository.getListings(filterDto);
  }

  async getListingById(id: string): Promise<Listing> {
    const foundListing = this.listingsRepository.findOne(id);
    if (!foundListing)
      throw new NotFoundException(`Listing with ID "${id}" not found`);

    return foundListing;
  }

  async createListing(createListingDto: CreateListingDto): Promise<Listing> {
    const image = await axios
      .get(
        `https://api.unsplash.com/search/photos?query=apartment&&page=1&client_id=${process.env.UNSPLASH_CLIENT_ID}`,
      )
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data.results);
        return res.data.results[
          Math.floor(Math.random() * res.data.results.length)
        ].urls.regular;
      })
      .catch((error) => {
        console.error(error);
      });
    if (image) createListingDto.image = image;
    return this.listingsRepository.createListing(createListingDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.listingsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
