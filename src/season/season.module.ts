import { Module } from '@nestjs/common';
import { SeasonResolver } from './season.resolver';
import { SeasonService } from './season.service';
import { ConfigService } from '@nestjs/config';
import { RequestService } from '../infrastructure/request.service';
import { PrismaService } from '../database/prisma.service';
import { CommonService } from '../common/common.service';

@Module({
  providers: [SeasonResolver, SeasonService, ConfigService, PrismaService, RequestService, CommonService],
})
export class SeasonModule {}
