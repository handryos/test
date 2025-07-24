export type CoffeeCreateModel = {
  name: string;
  description: string;
  type: string;
  price: number;
  imageUrl: string;
};

export type CoffeeUpdateModel = {
  name?: string;
  description?: string;
  type?: string;
  price?: number;
  imageUrl?: string;
};

export type CoffeeModelUniqRef = {
  name?: string;
  id?: number;
};
