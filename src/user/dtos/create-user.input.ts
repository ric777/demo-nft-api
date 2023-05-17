import { InputType, Field } from '@nestjs/graphql';
import Role from 'src/auth/enums/roles.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: Role;
}
