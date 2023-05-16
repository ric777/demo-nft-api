import { Test, TestingModule } from '@nestjs/testing';
import { NftResolver } from './nft.resolver';

describe('NftResolver', () => {
  let resolver: NftResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftResolver],
    }).compile();

    resolver = module.get<NftResolver>(NftResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
