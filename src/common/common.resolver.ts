import { Query, Resolver } from '@nestjs/graphql';
import { RegionList } from './common.schema';
import { CommonService } from './common.service';

@Resolver()
export class CommonResolver {
  constructor(private readonly commonService: CommonService) {}

  // @Query(() => AreaCodes)
  // async areaCodes(@Args('dailyAreaCode') dailyAreaCode: string): Promise<AreaCodes> {
  //   return await this.commonService.getAreaCodes(dailyAreaCode);
  // }

  @Query(() => RegionList)
  async regionList(): Promise<RegionList> {
    return await this.commonService.getRegionList();
  }

  // @Query(() => AreaList)
  // async weekAreaList(): Promise<AreaList> {
  //   const items = await this.commonService.getWeekAreaItem();
  //
  //   return {
  //     items,
  //   };
  // }
  //
  // @Query(() => AreaList)
  // async seasonAreaList(): Promise<AreaList> {
  //   const items = await this.commonService.getSeasonAreaItem();
  //
  //   return {
  //     items,
  //   };
  // }
}
