import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ForecastModule } from './forecast/forecast.module';
import { SeasonModule } from './season/season.module';
import { TwoWeekModule } from './two-week/two-week.module';
import { CommonModule } from './common/common.module';
import { AmedasModule } from './amedas/amedas.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.graphql',
    }),
    ForecastModule,
    SeasonModule,
    TwoWeekModule,
    CommonModule,
    AmedasModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
