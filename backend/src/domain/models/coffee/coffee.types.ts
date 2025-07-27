export type CoffeeCreateModel = {
  name: string;
  description: string;
  type: 'Arabic' | 'Robusta';
  price: number;
  image_url: string;
};

export type CoffeeUpdateModel = {
  name?: string;
  description?: string;
  type?: 'Arabic' | 'Robusta';
  price?: number;
  image_url?: string;
};


