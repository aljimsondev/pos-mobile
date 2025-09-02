import { Product as ProductType } from '@aljimsondev/database-schema';

export interface Product extends ProductType {
  photo: {
    file_name: string;
    id: number;
    mimetype: string;
    thumbnail_url: string | null;
    url: string;
  };
}
