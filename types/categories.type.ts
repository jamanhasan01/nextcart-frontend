/* =============================== Category ================================ */

import { IImage } from "./common.type";

export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  parent?: string;
  order?: number;
  image: IImage | null;
  status: "active" | "draft" ;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateCategory {
  name: string;
  slug: string;
  parent?: string | null;
  isActive: boolean;
}
