import { ObjectType, Field, Int } from '@nestjs/graphql';
import Role from 'src/auth/enums/roles.enum';
import { Nft } from 'src/nft/entities/nft.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  userId: number;

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

  @OneToMany(() => Nft, nft => nft.owner)
  nfts: Nft[];
}
