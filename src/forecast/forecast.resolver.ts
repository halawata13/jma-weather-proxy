import { Resolver, Query, Args } from '@nestjs/graphql';
import { Forecast, WeeklyForecast } from './forecast.schema';
import { ForecastService } from './forecast.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver()
export class ForecastResolver {
  constructor(private readonly forecastService: ForecastService) {}

  /**
   * 明日までの天気
   *
   * @param areaCode
   */
  @Query(() => Forecast)
  async daily(@Args('areaCode') areaCode: string): Promise<Forecast> {
    return await this.forecastService.getForecast(areaCode);
  }

  /**
   * 週間天気
   *
   * @param areaCode
   */
  @Query(() => WeeklyForecast)
  async weekly(@Args('areaCode') areaCode: string): Promise<WeeklyForecast> {
    return await this.forecastService.getWeeklyForecast(areaCode);
  }
}
