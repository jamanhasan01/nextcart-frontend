export interface IImage {
  url: string;
  publicId: string;
}

export type ProductSize = "m" | "l" | "xl";

export type ProductStatus = "active" | "inactive" | "draft" | "archived";

export interface IProduct {
  _id: string;

  productID: string;

  name: string;

  category:
    | string
    | {
        _id: string;
        name: string;
      };

  brand: string | null;

  price: number;

  discount: number;

  finalPrice: number;

  description: string;

  images: IImage[];

  thumbnail: IImage | null;

  stock: number;

  sizes: ProductSize[] | [];

  isTrending: boolean;

  isFlashDeal: boolean;

  isCombo: boolean;

  tags: string[];

  status: ProductStatus;

  createdAt: string;

  updatedAt: string;
}
