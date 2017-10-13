import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table } from "sequelize-typescript";

import { UserModel } from "server/models/UserModel";

export interface IUserSessionDTO {
    accessToken: string;
    userId: number;
    createdTime: Date;
    expiredTime: Date;
}

@Table({ tableName: "user_session" })
export class UserSessionModel extends Model<UserSessionModel> implements IUserSessionDTO {
    @Column({ field: "access_token", primaryKey: true  })
    accessToken: string;

    @ForeignKey(() => UserModel)
    @Column({ field: "user_id" })
    userId: number;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @CreatedAt
    @Column({ field: "created_time" })
    createdTime: Date;

    @Column({ field: "expired_time" })
    expiredTime: Date;

    toDTO() {
        return {
            accessToken: this.accessToken,
            userId: this.userId,
            createdTime: this.createdTime,
            expiredTime: this.expiredTime,
        } as IUserSessionDTO;
    }
}
