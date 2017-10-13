import { Unauthorized } from "server/libs";
import { IUserInfoDTO, UserModel } from "server/models/UserModel";
import { UserSessionModel } from "server/models/UserSessionModel";

export async function expressAuthentication(req: any, securityName: string, scopes: string[] = []): Promise<IUserInfoDTO> {
    let token;

    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            throw new Unauthorized();
        }
    }

    if (req.body && req.body.access_token) {
        if (token) { throw new Unauthorized(); }
        token = req.body.access_token;
    }

    if (req.query && req.query.access_token) {
        if (token) { throw new Unauthorized(); }
        token = req.query.access_token;
    }

    if (!token) { throw new Unauthorized("Request access token."); }

    const session = await UserSessionModel.findByPrimary<UserSessionModel>(token, {
        include: [{
            model: UserModel,
        }],
    });
    if (!session) {
        throw new Unauthorized("Invalid token.");
    }

    if (session.expiredTime.getTime() < Date.now()) {
        throw new  Unauthorized("Session expire.");
    }
    return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        accessToken: session.accessToken,
        expiredTime: session.expiredTime,
    } as IUserInfoDTO;
}
