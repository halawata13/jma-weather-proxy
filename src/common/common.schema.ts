import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Area {
  @Field()
  areaCode: string;

  @Field()
  regionName: string;

  @Field()
  prefName: string;

  @Field()
  areaName: string;
}

@ObjectType()
export class Pref {
  @Field(() => [Area])
  areaItems: Area[];

  @Field()
  prefName: string;

  @Field()
  prefCode: string;

  @Field()
  regionName: string;

  @Field()
  regionCode: string;
}

@ObjectType()
export class Region {
  @Field(() => [Pref])
  prefItems: Pref[];

  @Field()
  regionName: string;

  @Field()
  regionCode: string;
}

@ObjectType()
export class RegionList {
  @Field(() => [Region])
  regionItems: Region[];
}
