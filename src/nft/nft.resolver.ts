import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNftInput } from './dtos/create-nft.input';
import { UpdateNftInput } from './dtos/update-nft.input';
import { Nft } from './entities/nft.entity';
import { NftService } from './services/nft.service';

@Resolver(() => Nft)
export class NftResolver {
    constructor(private nftService: NftService) {}

  @Query(() => [Nft], {name: 'nfts'})
  async getAllNfts() {
    return this.nftService.getAll();
  }

  @Mutation(() => Nft)
  createNft(@Args('NftInput') createNftInput: CreateNftInput): Promise<Nft> {
    return this.nftService.createNft(createNftInput);
  }

  @Query(() => Nft, { name: 'nft' })
  findOne(@Args('id', { type: () => String }) id: number) {
    return this.nftService.findOne(id);
  }

  @Mutation(() => Nft)
  updateNft(@Args('updateNftInput') updateNftInput: UpdateNftInput) {
    return this.nftService.update(updateNftInput.id, updateNftInput);
  }

  @Mutation(() => Nft)
  removeNft(@Args('id', { type: () => Int }) id: number) {
    return this.nftService.remove(id);
  }

  @Mutation(() => Nft)
  async transferNftOwnership(
    @Args('id') id: number,
    @Args('newOwner') newOwner: string,
  ) {
    return this.nftService.transferOwnership(id, newOwner);
  }

  @Query(() => [Nft])
  async ownedNfts(
  @Args('owner') owner: string,
  @Args('page', { defaultValue: 1 }) page: number,
  @Args('limit', { defaultValue: 10 }) limit: number,
) {
  return this.nftService.findOwnedNftsByUser(owner, page, limit);
}
  
}
