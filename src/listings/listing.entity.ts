import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  // @Column()
  // phone_number: string;

  // @Column()
  // contact_name: string;

  // @Column()
  // image: string;

  // @Column()
  // washing_machine: boolean;

  // @Column()
  // pet_allowed: boolean;

  // @Column()
  // near_beach: boolean;

  // @Column()
  // wifi: boolean;

  // @Column()
  // bedrooms: number;

  // @Column()
  // bathrooms: number;

  // @Column()
  // floor: number;

  // @Column()
  // price: number;
}
