import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './nft/entities/nft.entity';
import { NftModule } from './nft/nft.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({ 
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123',
    database: 'test_db',
    entities: [Nft, User],
    synchronize: true,
  }), NftModule, AuthModule, UserModule],
  providers: [],
})
export class AppModule {}
