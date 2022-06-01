import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

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

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  washing_machine: boolean;

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  pet_allowed: boolean;

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  near_beach: boolean;

  @Transform(({ value }) => value === 'true')
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
