import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonResolver } from './common.resolver';
import { ConfigService } from '@nestjs/config';
import { RequestService } from '../infrastructure/request.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [CommonService, CommonResolver, ConfigService, PrismaService, RequestService],
})
export class CommonModule {}
