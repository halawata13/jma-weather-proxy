import { Args, Query, Resolver } from '@nestjs/graphql';
import { TwoWeekForecast } from './two-week.schema';
import { TwoWeekService } from './two-week.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver()
export class TwoWeekResolver {
  constructor(private readonly twoWeekService: TwoWeekService) {}

  /**
   * 2週間気温予報
   *
   * @param areaCode
   */
  @Query(() => TwoWeekForecast)
  async twoWeek(@Args('areaCode') areaCode: string): Promise<TwoWeekForecast> {
    return await this.twoWeekService.getTwoWeekForecast(areaCode);
  }
}
