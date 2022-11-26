import { Module } from '@nestjs/common';
import { TwoWeekResolver } from './two-week.resolver';
import { TwoWeekService } from './two-week.service';
import { ConfigService } from '@nestjs/config';
import { RequestService } from '../infrastructure/request.service';
import { PrismaService } from '../database/prisma.service';
import { CommonService } from '../common/common.service';

@Module({
  providers: [TwoWeekResolver, TwoWeekService, ConfigService, PrismaService, RequestService, CommonService],
})
export class TwoWeekModule {}
