import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Amedas {
  @Field(() => Float, { nullable: true })
  pressure: number | null;

  @Field(() => Float, { nullable: true })
  normalPressure: number | null;

  @Field(() => Float, { nullable: true })
  temp: number | null;

  @Field(() => Int, { nullable: true })
  humidity: number | null;

  @Field(() => Int, { nullable: true })
  snow: number | null;

  @Field(() => Int, { nullable: true })
  snow1h: number | null;

  @Field(() => Int, { nullable: true })
  snow6h: number | null;

  @Field(() => Int, { nullable: true })
  snow12h: number | null;

  @Field(() => Int, { nullable: true })
  snow24h: number | null;

  @Field(() => Int, { nullable: true })
  sun10m: number | null;

  @Field(() => Float, { nullable: true })
  sun1h: number | null;

  @Field(() => Float, { nullable: true })
  precipitation10m: number | null;

  @Field(() => Float, { nullable: true })
  precipitation1h: number | null;

  @Field(() => Float, { nullable: true })
  precipitation3h: number | null;

  @Field(() => Float, { nullable: true })
  precipitation24h: number | null;

  @Field(() => Int, { nullable: true })
  windDirection: number | null;

  @Field(() => Float, { nullable: true })
  wind: number | null;

  @Field(() => Int, { nullable: true })
  maxTempTimeHour: number | null;

  @Field(() => Int, { nullable: true })
  maxTempTimeMinute: number | null;

  @Field(() => Float, { nullable: true })
  maxTemp: number | null;

  @Field(() => Int, { nullable: true })
  minTempTimeHour: number | null;

  @Field(() => Int, { nullable: true })
  minTempTimeMinute: number | null;

  @Field(() => Float, { nullable: true })
  minTemp: number | null;

  @Field(() => Int, { nullable: true })
  gustTimeHour: number | null;

  @Field(() => Int, { nullable: true })
  gustTimeMinute: number | null;

  @Field(() => Int, { nullable: true })
  gustDirection: number | null;

  @Field(() => Float, { nullable: true })
  gust: number | null;

  @Field()
  reportDatetime: string;

  @Field()
  amedasCode: string;

  @Field()
  amedasName: string;
}
