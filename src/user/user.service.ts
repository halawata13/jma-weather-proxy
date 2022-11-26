import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { compareSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * ユーザを認証する
   *
   * @param username
   * @param password
   */
  public async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { name: username } });
    if (!user || !compareSync(password, user.password)) {
      return null;
    }

    return user;
  }
}
