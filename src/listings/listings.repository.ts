import { EntityRepository, Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.entity';

@EntityRepository(Listing)
export class ListingsRepository extends Repository<Listing> {
  async getListings(filterDto: GetListingsFilterDto): Promise<Listing[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('listing');

    if (search) {
      query.andWhere(
        'listing.title LIKE :search OR listing.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const listings = await query.getMany();
    return listings;
  }

  async createListing(createListingDto: CreateListingDto): Promise<Listing> {
    const { title, description, address } = createListingDto;

    const listing = this.create({
      title,
      description,
      address,
    });

    await this.save(listing);
    return listing;
  }
}
