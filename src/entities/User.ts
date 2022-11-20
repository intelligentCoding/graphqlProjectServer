import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./Roles";
import {  UserFruits } from "./UserFruits";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field()
  @Column({ unique: true })
  username!: string;
  
  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  min!: number;

  @Field()
  @Column()
  max!: number;

  @Column({type: "text"})
  password!: string;

  @OneToMany(()=> UserFruits, fruitsUsers => fruitsUsers.user)
  fruitsUsers: UserFruits[];

  @ManyToOne(()=> Roles, role => role.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Roles;
}
