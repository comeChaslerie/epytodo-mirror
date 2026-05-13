import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    if (!authHeader)
        return res.status(404).json({ msg: "No token, authorization denied" });

    let token: string;
    if (authHeader.startsWith("Bearer "))
        token = authHeader.slice(7);
    else
        token = authHeader;

    try {
        const decoded = jwt.verify(token, process.env.SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(404).json({ msg: "Token is not valid" });
    }

}

export default authMiddleware;
