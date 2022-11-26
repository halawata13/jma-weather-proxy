import { Module } from '@nestjs/common';
import { AmedasResolver } from './amedas.resolver';
import { AmedasService } from './amedas.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { RequestService } from '../infrastructure/request.service';
import { CommonService } from '../common/common.service';

@Module({
  providers: [AmedasResolver, AmedasService, ConfigService, PrismaService, RequestService, CommonService],
})
export class AmedasModule {}
