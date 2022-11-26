import { Test, TestingModule } from '@nestjs/testing';
import { CommonResolver } from './common.resolver';
import { CommonService } from './common.service';
import { RegionList } from './common.schema';

describe('CommonResolver', () => {
  let resolver: CommonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonResolver,
        {
          provide: CommonService,
          useClass: class {
            getRegionList(): Promise<RegionList> {
              return Promise.resolve({
                regionItems: [],
              });
            }
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonResolver>(CommonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a region list', async () => {
    const result = await resolver.regionList();
    expect(result.regionItems).toBeDefined();
  });
});
