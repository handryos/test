export class CoffeeEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly type: 'Arabic' | 'Robusta',
    public readonly price: number,
    public readonly image_url: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    id: number,
    name: string,
    description: string,
    type: 'Arabic' | 'Robusta',
    price: number,
    image_url: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): CoffeeEntity {
    return new CoffeeEntity(
      id,
      name,
      description,
      type,
      price,
      image_url,
      createdAt,
      updatedAt,
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      price: this.price,
      image_url: this.image_url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
