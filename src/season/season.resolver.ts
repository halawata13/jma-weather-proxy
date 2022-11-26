import { Args, Query, Resolver } from '@nestjs/graphql';
import { Season } from './season.schema';
import { SeasonService } from './season.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver()
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  /**
   * 1か月予報
   *
   * @param areaCode
   */
  @Query(() => Season)
  async month1(@Args('areaCode') areaCode: string): Promise<Season> {
    return await this.seasonService.get1Month(areaCode);
  }

  /**
   * 3か月予報
   *
   * @param areaCode
   */
  @Query(() => Season)
  async month3(@Args('areaCode') areaCode: string): Promise<Season> {
    return await this.seasonService.get3Months(areaCode);
  }

  /**
   * 寒候期/暖候期予報
   *
   * @param areaCode
   */
  @Query(() => Season)
  async month6(@Args('areaCode') areaCode: string): Promise<Season> {
    return await this.seasonService.get6Months(areaCode);
  }
}
