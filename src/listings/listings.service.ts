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
        return res.data.results[
          Math.floor(Math.random() * res.data.results.length)
        ].urls.regular;
      })
      .catch((error) => {
        console.error(error);
      });
    if (image) createListingDto.image = image;
    const newCreateListingDto = this.convertBooleanValues(createListingDto);
    return this.listingsRepository.createListing(newCreateListingDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.listingsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  private convertBooleanValues(
    createListingDto: CreateListingDto,
  ): CreateListingDto {
    const keys = Object.keys(createListingDto);
    let n = keys.length;
    while (n--) {
      const key = keys[n];
      if (createListingDto[key] == 'true' || createListingDto[key] == 'false') {
        createListingDto[key] = createListingDto[key] === 'true';
      } else {
        createListingDto[key] = createListingDto[key];
      }
    }
    return createListingDto;
  }
}
