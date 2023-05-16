import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateNftInput } from "./create-nft.input";

@InputType()
export class UpdateNftInput extends PartialType(CreateNftInput){
    @Field(() => Int)
    id: number;
}