import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftController } from './controllers/nft.controller';
import { Nft } from './entities/nft.entity';
import { NftService } from './services/nft.service';
import { NftResolver } from './nft.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([Nft]),
  ],
  controllers: [NftController],
  providers: [NftService, NftResolver]
})
export class NftModule {}
