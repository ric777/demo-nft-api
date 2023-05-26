import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import Role from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateNftInput } from './dtos/create-nft.input';
import { UpdateNftInput } from './dtos/update-nft.input';
import { Nft } from './entities/nft.entity';
import { NftService } from './services/nft.service';

@Resolver(() => Nft)
export class NftResolver {
    constructor(
      private nftService: NftService,
    ) {}

  @Query(() => [Nft], {name: 'nfts'})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllNfts() {
    return this.nftService.getAll();
  }

  @Mutation(() => Nft)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createNft(@Args('NftInput') createNftInput: CreateNftInput): Promise<Nft> {
    return await this.nftService.createNft(createNftInput);
  }

  @Query(() => Nft, { name: 'nft' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id', { type: () => String }) id: number) {
    return this.nftService.findOne(id);
  }

  @Mutation(() => Nft)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateNft(@Args('updateNftInput') updateNftInput: UpdateNftInput) {
    return this.nftService.update(updateNftInput.id, updateNftInput);
  }

  @Mutation(() => Nft)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeNft(@Args('id', { type: () => Int }) id: number) {
    return this.nftService.remove(id);
  }

  @Mutation(() => Nft)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async transferNftOwnership(
    @Args('id') id: number,
    @Args('newOwner') newOwnerId: number,
  ) {
    return this.nftService.transferOwnership(id, newOwnerId);
  }

  @Query(() => [Nft])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async ownedNfts(
  @Args('owner') owner: number,
  @Args('page', { defaultValue: 1 }) page: number,
  @Args('limit', { defaultValue: 10 }) limit: number,
) {
   const {nfts} = await this.nftService.findOwnedNftsByUser(owner, page, limit);
   return nfts.filter(nft => nft.owner);
}

@Query(() => Int)
async totalPages(
  @Args('owner') owner: number,
  @Args('limit', { defaultValue: 10 }) limit: number,
) {
  const { totalPages } = await this.nftService.findOwnedNftsByUser(owner, 1, limit);
  return totalPages;
}
  
}
