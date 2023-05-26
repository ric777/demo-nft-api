import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateNftInput } from '../dtos/create-nft.input';
import { UpdateNftInput } from '../dtos/update-nft.input';
import { Nft } from '../entities/nft.entity';

@Injectable()
export class NftService {
    constructor(
        @InjectRepository(Nft)
        private nftRepository: Repository<Nft>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

      async getAll(): Promise<Nft[]> {
        return await this.nftRepository.find();
      }

      async createNft(createNftInput: CreateNftInput): Promise<Nft> {
        const { userId, ...nftData } = createNftInput;
    
        const owner: User = await this.userRepository.findOneBy({userId});
    
        if (!owner) {
          throw new NotFoundException(`User with Id:${userId} not found`);
        }
    
        const nft = this.nftRepository.create({
          ...nftData,
          owner,
        });
    
        return this.nftRepository.save(nft);
      }

      async findOne(nftId: number): Promise<Nft> {
        const nft = await this.nftRepository.findOneBy({nftId});
        if (!nft){
            throw new NotFoundException(`Nft with Id:${nftId} not found`);
        } 
        return nft;
      }

      async update(
        id: number,
        updateNftInput: UpdateNftInput,
      ): Promise<Nft> {
        const nft = await this.nftRepository.preload({
          id: id,
          ...updateNftInput,
        });
        if (!nft) {
          throw new NotFoundException(`Nft #${id} not found`);
        }
        return this.nftRepository.save(nft);
      }

      async remove(nftId: number): Promise<Nft> {
        const nft = await this.nftRepository.findOneBy({nftId});
        await this.nftRepository.remove(nft);
        return {
          nftId: nftId,
          name: '',
          owner:null,
          mintDate: '',
          blockchainLink: '',
          imageUrl: '',
          description: '',
        };
      }

      async transferOwnership(nftId: number, userId: number): Promise<Nft> {
        const nft = await this.nftRepository.findOneBy({nftId});
    
        if (!nft) {
          throw new NotFoundException('NFT not found');
        }
    
        const newOwner = await this.userRepository.findOneBy({userId});
    
        if (!newOwner) {
          throw new NotFoundException('New owner not found');
        }
    
        nft.owner = newOwner;
        await this.nftRepository.save(nft);
    
        return nft;
      }

    async findOwnedNftsByUser(userId: number, page: number, limit: number) {
        const options: FindManyOptions<Nft> = {
            where: { owner: {userId: userId}},
            skip: (page - 1) * limit,
            take: limit,
            relations:['owner']
          }; 

          
          const [nfts, totalNfts] = await this.nftRepository.findAndCount(options);
          const totalPages = Math.ceil(totalNfts/limit)

          return {nfts, totalPages}
    }

}
