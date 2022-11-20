import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { adminAuth, auth } from "../auth";
import { getConnection } from "typeorm";
import { Fruits } from "../entities/Fruits";
import { ApolloError } from "apollo-server-express";

@Resolver()
export class FruitsResolver {
  @Query(() => [Fruits])
  async fruits(): // TODO: pagination
  // @Arg('limit', () => Int) limit: number,
  // @Arg('cursor', () => String, { nullable: true}) cursor: string | null,
  Promise<Fruits[]> {
    // const customLimit = Math.min(25, limit);
    const qb = getConnection()
      .getRepository(Fruits)
      .createQueryBuilder("d")
      .orderBy('d."createdAt"', "DESC");
    // .take(customLimit)
    // if(cursor){
    //   qb.where('"createdAt" < :cursor', {
    //     cursor: new Date(parseInt(cursor))
    //   })
    // }
    return qb.getMany();
  }

  @Query(() => Fruits, { nullable: true })
  @UseMiddleware(auth)
  fruitById(
    @Arg("id", () => Int) id: number
  ): Promise<Fruits | undefined> {
    return Fruits.findOne(id, { relations: ["userFruits"] });
  }

  @Mutation(() => Fruits)
  @UseMiddleware(adminAuth)
  async updateFruits(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string,
  ): Promise<Fruits | null> {
    const result =  await getConnection()
      .createQueryBuilder()
      .update(Fruits)
      .set({ Fruitsname:name})
      .where('id = :id', {
        id,
      })
      .returning("*")
      .execute();
      return result.raw[0];
  }

  @Mutation(() => Fruits)
  @UseMiddleware(adminAuth)
  async createFruits(
    @Arg("name", () => String) name: string,
  ): Promise<Fruits> {
    const fruit = await Fruits.findOne({
      where: {
        Fruitsname: name
      }
    })
    if(fruit) {
      throw new ApolloError('Fruit already exists', 'FRUIT_ALREADY_EXIST')
    }
    const results = await getConnection().createQueryBuilder().insert().into(Fruits).values({
      Fruitsname: name
    }
    ).returning('*').execute();
    return results.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(adminAuth)
  async deleteFruit(
    @Arg("id", () => Int) id: number,
    ): Promise<boolean> {
    await Fruits.delete({id});
    return true;
  }
}
