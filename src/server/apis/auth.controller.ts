import * as express from "express";
import * as randomString from "randomstring";
import { BodyProp, Get, Post, Request, Route, Security, Tags } from "tsoa";

import { ApiError, HTTP_CODES } from "server/libs";
import { IUserInfoDTO, UserModel } from "../models/UserModel";
import { UserSessionModel } from "../models/UserSessionModel";

@Route("auth")
export class AuthController {
    @Tags("Auth")
    @Post("login")
    public async login(
        @BodyProp() email: string,
        @BodyProp() password: string): Promise<IUserInfoDTO> {
        const user = await UserModel.findOne<UserModel>({
            where: {
                email,
                password,
            },
        });
        if (!user) {
            throw new ApiError("UserNotFount", HTTP_CODES.BAD_REQUEST);
        }

        const newUserSession = new UserSessionModel();
        newUserSession.accessToken = randomString.generate({ length: 64 });
        newUserSession.userId = user.id;
        newUserSession.expiredTime = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));

        const userSession = await newUserSession.save();
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: userSession.accessToken,
            expiredTime: userSession.expiredTime,
        } as IUserInfoDTO;
    }

    @Tags("Auth")
    @Post("register")
    public async register(
        @BodyProp() firstname: string,
        @BodyProp() lastname: string,
        @BodyProp() email: string,
        @BodyProp() password: string): Promise<IUserInfoDTO> {
        const newUser = new UserModel();
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.email = email;
        newUser.password = password;
        const user = await newUser.save();

        const newUserSession = new UserSessionModel();
        newUserSession.accessToken = randomString.generate({ length: 64 });
        newUserSession.userId = user.id;
        newUserSession.expiredTime = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
        const userSession = await newUserSession.save();
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: userSession.accessToken,
            expiredTime: userSession.expiredTime,
        } as IUserInfoDTO;
    }

    @Tags("Auth")
    @Get("logout")
    @Security("MehubAuth")
    public async logout( @Request() req: express.Request): Promise<void> {
        await UserSessionModel.destroy({
            where: {
                accessToken: req.user.accessToken,
            },
        });
    }

    @Tags("Auth")
    @Get("info")
    @Security("MehubAuth")
    public async info( @Request() req: express.Request): Promise<IUserInfoDTO> {
        return req.user;
    }
}
