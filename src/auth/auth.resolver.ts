import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/login-response';
import { LoginUserInput } from './dtos/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  signup(@Args('signupUserInput') signupUserInput: CreateUserInput) {
    return this.authService.signup(signupUserInput);
  }
}