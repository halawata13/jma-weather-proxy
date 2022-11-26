import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwoWeekForecastItem {
  @Field()
  date: string;

  @Field(() => Int)
  tempMin: number;

  @Field(() => Int)
  tempMinUpper: number;

  @Field(() => Int)
  tempMinLower: number;

  @Field(() => Float)
  tempMinNormal: number;

  @Field(() => Int)
  tempMax: number;

  @Field(() => Int)
  tempMaxUpper: number;

  @Field(() => Int)
  tempMaxLower: number;

  @Field(() => Float)
  tempMaxNormal: number;
}

@ObjectType()
export class TwoWeekForecast {
  @Field(() => [TwoWeekForecastItem])
  week1: TwoWeekForecastItem[];

  @Field(() => [TwoWeekForecastItem])
  week2: TwoWeekForecastItem[];

  @Field()
  reportDatetime: string;

  @Field()
  twoWeekAreaCode: string;

  @Field()
  twoWeekAreaName: string;
}
