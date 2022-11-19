import { MiddlewareFn } from "type-graphql";
import { Mycontext } from "./types";

export const auth: MiddlewareFn<Mycontext> = ({context}, next) => {
    if(!context.req.session.userId){
        throw new Error("You are not an authenticated user")
    }
    return next();
}