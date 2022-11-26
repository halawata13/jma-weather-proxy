import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { TokenCreateDto } from './token.dto';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { DateTime } from 'luxon';

dotenv.config();

@Controller('token')
export class TokenController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  /**
   * トークン取得
   *
   * @param body
   */
  @Post('')
  public async create(@Body() body: TokenCreateDto) {
    const user = await this.userService.validateUser(body.username, body.password);
    if (!user) {
      throw new ForbiddenException();
    }

    return {
      token: this.jwtService.sign(
        {},
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '30m',
        },
      ),
      expiredAt: DateTime.now().plus({ minutes: 30 }).toMillis(),
    };
  }
}
