import { Module } from '@nestjs/common';
import { TokenController } from './token/token.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [TokenController],
  providers: [UserService, PrismaService, JwtService, JwtStrategy, ConfigService],
})
export class AuthModule {}
