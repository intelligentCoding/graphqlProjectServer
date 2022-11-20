import { MiddlewareFn } from "type-graphql";
import { User } from "./entities/User";
import { Mycontext } from "./types";

export const auth: MiddlewareFn<Mycontext> = ({context}, next) => {
    if(!context.req.session.userId){
        throw new Error("You are not an authenticated user")
    }
    return next();
}
export const adminAuth: MiddlewareFn<Mycontext> = async ({context}, next) => {
    if(!context.req.session.userId){
        throw new Error("You are not an authenticated user")
    }
    const user = await User.findOne(
        context.req.session.userId, 
        {relations: ['role']}
        )
    if(user?.role.name !== 'ADMIN') {
        throw new Error("Only Admin allow to do these changes")
    }
    return next();
}