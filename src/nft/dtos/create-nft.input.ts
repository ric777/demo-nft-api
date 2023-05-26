import { Field, InputType, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

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
    mintDate: string;

    @Field(() => Int)
    userId: number;
}