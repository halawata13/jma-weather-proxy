import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SeasonItem {
  @Field(() => [String], {
    nullable: 'items',
  })
  temperature: [string | null, string | null, string | null];

  @Field(() => [String], {
    nullable: 'itemsAndList',
  })
  precipitation?: [string | null, string | null, string | null];

  @Field(() => [String], {
    nullable: 'itemsAndList',
  })
  sunshine?: [string | null, string | null, string | null];

  @Field(() => [String], {
    nullable: 'itemsAndList',
  })
  snowfall?: [string | null, string | null, string | null];

  @Field()
  fromDate: string;

  @Field()
  toDate: string;
}

@ObjectType()
export class Season {
  @Field(() => [SeasonItem])
  items: SeasonItem[];

  @Field()
  reportDatetime: string;

  @Field()
  targetDatetime: string;

  @Field()
  seasonAreaCode: string;

  @Field()
  seasonAreaName: string;
}
