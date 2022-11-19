import { Request, Response } from "express";

export type Mycontext = {
  req: Request;
  res: Response;
};
