import { Request, Response } from "express";

function notFoundMiddleware(req: Request, res: Response) {
    return res.status(404).json({ msg: "Not found" });
}

export default notFoundMiddleware;
