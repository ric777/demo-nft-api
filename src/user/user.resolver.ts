import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import Role from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserInput } from './dtos/create-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Example of a query that requires a JWT token and a role of ADMIN
  @Query(() => [User], { name: 'users' })
  // Make sure to add RolesGuard to the @UseGuards() decorator
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Create roles in enums/roles.enum.ts
  // Import the enum
  // Add the right roles to the @Roles() decorator
  @Roles(Role.ADMIN)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('email') email: string): Promise<User> {
    return this.userService.findOne(email);
  }

  @Mutation(() => User)
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }
}