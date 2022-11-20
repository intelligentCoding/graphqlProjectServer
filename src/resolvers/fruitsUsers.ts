import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { adminAuth, auth } from "../auth";
import { getConnection } from "typeorm";
import { UserFruits } from "../entities/UserFruits";
import { ApolloError } from "apollo-server-errors";

@InputType()
class CreatFruitUsersInput {
  @Field()
  userId: number;
  @Field()
  fruitId: number;
  @Field()
  min: number;
  @Field()
  max: number;
}
@InputType()
class UpdateFruitUsersInput {
  @Field({nullable: false})
  id: number;
  @Field({nullable: true})
  min?: number;
  @Field({nullable: true})
  max?: number;
}
@Resolver()
export class UserFruitsResolver {
  @Query(() => [UserFruits])
  @UseMiddleware(auth)
  async fruitsUsers(
    @Arg("id", () => Int) id: number,
  ): // TODO: pagination
  Promise<UserFruits[]> {
    return UserFruits.find({
      where: {
        user: {
          id
        }
      },
      relations: ['user', 'fruits']
    })
  }

  @Query(() => UserFruits, { nullable: true })
  // @UseMiddleware(auth)
  userFruitsById(
    @Arg("id", () => Int) id: number
  ): Promise<UserFruits | undefined> {
    return UserFruits.findOne(id, {
      relations: ['user', 'fruits']
    });
  }

  @Mutation(() => UserFruits)
  @UseMiddleware(adminAuth)
  async updateUserFruits(
    @Arg("updateFruitUsersInput") updateFruitUsersInput: UpdateFruitUsersInput,
  ): Promise<UserFruits | null> {
    const result =  await getConnection()
      .createQueryBuilder()
      .update(UserFruits)
      .set({
        ...(updateFruitUsersInput.min && {min: updateFruitUsersInput.min}),
        ...(updateFruitUsersInput.max && {max: updateFruitUsersInput.max})
      })
      .where('id = :id', {
        id: updateFruitUsersInput.id
      })
      .returning("*")
      .execute();
      return result.raw[0];
  }

  @Mutation(() => UserFruits)
  @UseMiddleware(adminAuth)
  async createFruitUsers(
    @Arg("creatFruitUsersInput") creatFruitUsersInput: CreatFruitUsersInput,
  ): Promise<UserFruits> {
    //first need to make sure that user doesn't already has fruit added.
    creatFruitUsersInput.max
    const userFruits = await UserFruits.find({where: {
      fruits: {
        id: creatFruitUsersInput.fruitId
      },
      user: {
        id: creatFruitUsersInput.userId
      } 
    },
    relations:['user']
  })
    if(userFruits.length > 1) {
      throw new ApolloError('Fruit has already been added', "FRUIT_ALREADY_ADDED")
    }


    const results = await getConnection().createQueryBuilder().insert().into(UserFruits).values({
      min: creatFruitUsersInput.min,
      max: creatFruitUsersInput.max,
      user: {
        id: creatFruitUsersInput.userId
      },
      fruits: {
        id: creatFruitUsersInput.fruitId
      }
    }
    ).returning('*').execute();
    return results.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async deleteFruitUsers(
    @Arg("id", () => Int) id: number,
    ): Promise<boolean> {
    await UserFruits.delete({id});
    return true;
  }
}
