import { RequestWithUser } from "../middleware/auth";

export const isUserAuth = (req: RequestWithUser) => {
    if(req.user && req.user.type === "authenticated") {
        return true;
    }
    return false;
}