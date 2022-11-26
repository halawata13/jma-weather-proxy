import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ForecastItem {
  @Field()
  date: string;

  @Field(() => String, {
    nullable: true,
  })
  weatherCode: string | null;

  @Field(() => String, {
    nullable: true,
  })
  weather: string | null;

  @Field(() => String, {
    nullable: true,
  })
  jmaWeatherImgCode: string | null;

  @Field(() => String, {
    nullable: true,
  })
  wind: string | null;

  @Field(() => String, {
    nullable: true,
  })
  wave: string | null;

  @Field(() => [Int], {
    nullable: 'items',
  })
  pop: number[] | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMin: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMax: number | null;
}

@ObjectType()
export class Forecast {
  @Field(() => [ForecastItem])
  items: ForecastItem[];

  @Field()
  reportDatetime: string;

  @Field()
  areaCode: string;

  @Field()
  areaName: string;
}

@ObjectType()
export class WeeklyForecastItem {
  @Field()
  date: string;

  @Field(() => String, {
    nullable: true,
  })
  weatherCode: string | null;

  @Field(() => String, {
    nullable: true,
  })
  jmaWeatherImgCode: string | null;

  @Field(() => Int, {
    nullable: true,
  })
  pop: number | null;

  @Field(() => String, {
    nullable: true,
  })
  reliability: string | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMin: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMinUpper: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMinLower: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMax: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMaxUpper: number | null;

  @Field(() => Int, {
    nullable: true,
  })
  tempMaxLower: number | null;
}

@ObjectType()
export class WeeklyForecast {
  @Field(() => [WeeklyForecastItem])
  items: WeeklyForecastItem[];

  @Field()
  reportDatetime: string;

  @Field()
  weekAreaCode: string;

  @Field()
  weekAreaName: string;
}
