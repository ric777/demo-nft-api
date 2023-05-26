import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dtos/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRespository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRespository.findOneBy({ email });
  }

  create(createUserInput: CreateUserInput) {
    const user = this.usersRespository.create(createUserInput);
    return this.usersRespository.save(user);
  }

  findUserById(userId: number): User | PromiseLike<User> {
    return this.usersRespository.findOneBy({ userId });
  }
}
