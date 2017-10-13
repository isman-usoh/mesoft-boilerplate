import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "Topic" })
export class Topic extends Model<Topic> {

  @Column
  title: string;

  @Column({
    field: "description2",
    type: DataType.STRING(512),
  })
  description: string;
}
