import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserFruits } from "./UserFruits";

@ObjectType()
@Entity()
export class Fruits extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field()
  @Column({ unique: true })
  Fruitsname!: string;

  @OneToMany(()=> UserFruits, userFruits => userFruits.fruits)
  userFruits: UserFruits[];

}
