import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateNftInput } from '../dtos/create-nft.input';
import { UpdateNftInput } from '../dtos/update-nft.input';
import { Nft } from '../entities/nft.entity';

@Injectable()
export class NftService {
    constructor(
        @InjectRepository(Nft)
        private nftRepository: Repository<Nft>,
      ) {}

      async getAll(): Promise<Nft[]> {
        return await this.nftRepository.find();
      }

      async createNft(nftInput: CreateNftInput): Promise<Nft> {
        const newNft = this.nftRepository.create(nftInput);
        return await this.nftRepository.save(newNft);
      }

      async findOne(id: number): Promise<Nft> {
        const nft = await this.nftRepository.findOneBy({id});
        if (!nft){
            throw new NotFoundException(`Nft #${id} not found`);
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

      async remove(id: number): Promise<Nft> {
        const nft = await this.nftRepository.findOneBy({id});
        await this.nftRepository.remove(nft);
        return {
          id: id,
          name: '',
          owner:'',
          mintDate: '',
          blockchainLink: '',
          imageUrl: '',
          description: '',
        };
      }

      async transferOwnership(id: number, newOwner: string): Promise<Nft> {
        const nft = await this.nftRepository.findOneBy({id});
        if (!nft) {
          throw new Error(`NFT with ID ${id} not found.`);
        }
    
        nft.owner = newOwner;
        return this.nftRepository.save(nft);
    }

    async findOwnedNftsByUser(owner: string, page: number, limit: number) {
        const options: FindManyOptions<Nft> = {
            where: { owner: owner },
            skip: (page - 1) * limit,
            take: limit,
          };
          return this.nftRepository.find(options);
    }

}
