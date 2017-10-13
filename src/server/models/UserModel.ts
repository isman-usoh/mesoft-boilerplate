import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

export interface IUserInfoDTO {
    id: number;
    email: string;
    name: string;
    accessToken: string;
    expiredTime: Date;
}

export interface IUserDTO {
    id?: number;
    email: string;
    firstname: string;
    lastname: string;
}

@Table({ tableName: "user" })
export class UserModel extends Model<UserModel> implements IUserDTO {
    @PrimaryKey
    @AutoIncrement
    @Column
    id?: number;

    @Unique
    @Column(DataType.STRING(128))
    email: string;

    @Column(DataType.STRING(128))
    password: string;

    @Column(DataType.STRING(128))
    firstname: string;

    @Column
    lastname: string;

    get name() {
        return this.firstname + " " + this.lastname;
    }

    toDTO() {
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
        } as IUserDTO;
    }
}
