import { Optional } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNftInput {
    @Field()
    name: string;

    @Field()
    blockchainLink: string;

    @Field()
    description: string;

    @Field()
    imageUrl: string;

    @Field()
    owner: string;

    @Field()
    mintDate: string;
}