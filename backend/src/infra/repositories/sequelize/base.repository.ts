import { Model, ModelStatic, WhereOptions } from 'sequelize';
import { IBaseRepository } from 'src/domain/interfaces/repositories/base-repository-interface';

export abstract class BaseSequelizeRepository<
  TEntity,
  TUpdateModel,
  TUniqRef,
  TModel extends Model,
> implements
    IBaseRepository<
      TEntity,
      Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>,
      TUpdateModel,
      TUniqRef
    >
{
  protected constructor(protected readonly model: ModelStatic<TModel>) {}

  async findAll(): Promise<TEntity[]> {
    const models = await this.model.findAll();
    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<TEntity | null> {
    const model = await this.model.findByPk(id);
    return model ? this.toDomain(model) : null;
  }

  async create(
    data: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TEntity> {
    const model = await this.model.create(data as any);
    return this.toDomain(model);
  }

  async update(id: number, data: TUpdateModel): Promise<TEntity | null> {
    const [affectedRows] = await this.model.update(data as any, {
      where: { id } as WhereOptions,
    });

    if (affectedRows === 0) {
      return null;
    }

    const updatedModel = await this.model.findByPk(id);
    return updatedModel ? this.toDomain(updatedModel) : null;
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await this.model.destroy({
      where: { id } as WhereOptions,
    });
    return affectedRows > 0;
  }

  protected abstract toDomain(model: TModel): TEntity;
}
