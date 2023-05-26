import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Nft {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    nftId: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    blockchainLink: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    imageUrl: string;

    @Column()
    @Field()
    mintDate: string;

    @ManyToOne(() => User, user => user.nfts)
    @Field()
    owner: User;
}