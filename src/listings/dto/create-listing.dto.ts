import { IsNotEmpty } from 'class-validator';

export class CreateListingDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  contact_name: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  washing_machine: boolean;

  @IsNotEmpty()
  pet_allowed: boolean;

  @IsNotEmpty()
  near_beach: boolean;

  @IsNotEmpty()
  wifi: boolean;

  @IsNotEmpty()
  bedrooms: number;

  @IsNotEmpty()
  bathrooms: number;

  @IsNotEmpty()
  floor: number;

  @IsNotEmpty()
  price: number;
}
