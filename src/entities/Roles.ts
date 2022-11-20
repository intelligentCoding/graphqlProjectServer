import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Roles extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Column({type: "text"})
  name!: string;


  @Field(() => [User], {nullable: true})
  @OneToMany(
    () => User,
    (user) => user.role
  )
  user: User[]
}
