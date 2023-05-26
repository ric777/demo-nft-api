import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftController } from './controllers/nft.controller';
import { Nft } from './entities/nft.entity';
import { NftService } from './services/nft.service';
import { NftResolver } from './nft.resolver';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Nft, User]),
  ],
  controllers: [NftController],
  providers: [NftService, NftResolver, UserService]
})
export class NftModule {}
