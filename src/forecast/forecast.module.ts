import { Module } from '@nestjs/common';
import { ForecastResolver } from './forecast.resolver';
import { ForecastService } from './forecast.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { RequestService } from '../infrastructure/request.service';
import { CommonService } from '../common/common.service';

@Module({
  providers: [ForecastResolver, ForecastService, ConfigService, PrismaService, RequestService, CommonService],
})
export class ForecastModule {}
