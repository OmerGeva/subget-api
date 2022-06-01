import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.model';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  async getAllListings(@Query() filterDto: GetListingsFilterDto) {
    const listings = await this.listingsService.getListings(filterDto);
    return { listings };
  }

  @Get('/:id')
  getListingById(@Param('id') id: string): Promise<Listing> {
    return this.listingsService.getListingById(id);
  }

  @Post()
  createListing(@Body() createListingDto: CreateListingDto): Promise<Listing> {
    console.log(createListingDto);
    return this.listingsService.createListing(createListingDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.listingsService.deleteTask(id);
  }
}
