import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.model';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  getAllListings(@Query() filterDto: GetListingsFilterDto): Promise<Listing[]> {
    return this.listingsService.getListings(filterDto);
  }

  @Get('/:id')
  getListingById(@Param('id') id: string): Promise<Listing> {
    return this.listingsService.getListingById(id);
  }

  @Post()
  createListing(@Body() createListingDto: CreateListingDto): Promise<Listing> {
    return this.listingsService.createListing(createListingDto);
  }
}
