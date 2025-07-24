export class CoffeeEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly type: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    id: number,
    name: string,
    description: string,
    type: string,
    price: number,
    imageUrl: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): CoffeeEntity {
    return new CoffeeEntity(
      id,
      name,
      description,
      type,
      price,
      imageUrl,
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
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
