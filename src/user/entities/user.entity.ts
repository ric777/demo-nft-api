import { ObjectType, Field, Int } from '@nestjs/graphql';
import Role from 'src/auth/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  @Field()
  role: Role;
}
