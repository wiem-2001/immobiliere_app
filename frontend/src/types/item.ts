export interface Item {
  id: string;
  title: string;
  city: string;
  price: number;
  surface: number;
}

export type CreateItemInput = Omit<Item, "id">;
export type UpdateItemInput = Partial<Omit<Item, "id">>;