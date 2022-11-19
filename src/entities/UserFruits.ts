import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fruits } from "./Fruits";
// import { Fruits } from "./Fruits";
import { User } from "./User";


@ObjectType()
@Entity()
export class UserFruits extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
  
  @Field()
  @Column({ type: "int" })
  min!: number;

  @Field()
  @Column({ type: "int" })
  max!: number;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.fruitsUsers,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User

  @Field(() => Fruits)
  @ManyToOne(
    () => Fruits,
    (fruits) => fruits.userFruits,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn([{ name: 'fruits_id', referencedColumnName: 'id' }])
  fruits: Fruits

}
