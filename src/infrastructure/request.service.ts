import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { promises as fs } from 'fs';
import axios from 'axios';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';

export enum RequestType {
  forecastArea,
  weekArea05,
  weekAreaName,
  area,
  forecast,
  twoWeekForecast,
  seasonForecast,
  amedas,
  amedasTable,
}

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}

  /**
   * JSONデータをリクエストする
   *
   * @param type
   * @param path
   * @param cache
   */
  async request<T>(type: RequestType, path: string, cache = true): Promise<T> {
    // キャッシュ確認
    if (cache) {
      try {
        const cachedData = await this.prisma.cache.findUnique({ where: { path } });
        // キャッシュデータがあり、有効期限内であればそれを返す
        if (cachedData && cachedData.expiredAt.getTime() > new Date().getTime()) {
          return JSON.parse(cachedData.content) as T;
        }
      } catch (err) {
        console.error(err);
        if (this.configService.get<boolean>('DEBUG')) {
          throw err;
        }
      }
    }

    // JSONデータ
    const content = await (async () => {
      try {
        // httpから始まっていなければローカルファイル
        if (!path.startsWith('http')) {
          const data = await fs.readFile(__dirname + path, 'utf-8');
          return JSON.parse(data) as T;
        }

        return await axios.get<T>(path).then((res) => res.data);
      } catch (err) {
        console.error(err);
        throw err;
      }
    })();

    try {
      // キャッシュを保存する
      const values = {
        content: JSON.stringify(content),
        expiredAt: this.getExpiredDateTime(type),
      };

      await this.prisma.cache.upsert({
        where: {
          path,
        },
        create: {
          path,
          ...values,
        },
        update: values,
      });
    } catch (err) {
      console.error(err);
      if (this.configService.get<boolean>('DEBUG')) {
        throw err;
      }
    }

    return content;
  }

  /**
   * リクエストするデータタイプに応じて有効期限を返す
   *
   * @param type
   * @param basis
   */
  getExpiredDateTime(type: RequestType, basis = DateTime.now()): Date {
    switch (type) {
      // マスタデータ系
      case RequestType.area:
      case RequestType.forecastArea:
      case RequestType.weekArea05:
      case RequestType.weekAreaName:
      case RequestType.amedasTable:
        return basis.set({ hour: 0, minute: 0, second: 0 }).plus({ day: 1 }).toJSDate();

      // 通常予報と週間予報
      case RequestType.forecast:
        if (basis.hour < 5) {
          return basis.set({ hour: 5, minute: 0, second: 0 }).toJSDate();
        }
        if (basis.hour >= 5 && basis.hour < 11) {
          return basis.set({ hour: 11, minute: 0, second: 0 }).toJSDate();
        }
        if (basis.hour >= 11 && basis.hour < 17) {
          return basis.set({ hour: 17, minute: 0, second: 0 }).toJSDate();
        } else {
          return basis.set({ hour: 5, minute: 0, second: 0 }).plus({ day: 1 }).toJSDate();
        }

      // 2週間気温予報
      case RequestType.twoWeekForecast:
        if (basis.hour < 15) {
          return basis.set({ hour: 15, minute: 0, second: 0 }).toJSDate();
        } else {
          return basis.set({ hour: 15, minute: 0, second: 0 }).plus({ day: 1 }).toJSDate();
        }

      // 季節予報
      case RequestType.seasonForecast:
        if (basis.weekday < 4 || (basis.weekday === 4 && basis.hour < 15)) {
          return basis
            .set({ hour: 15, minute: 0, second: 0 })
            .plus({ day: 4 - basis.weekday })
            .toJSDate();
        } else {
          return basis
            .set({ hour: 15, minute: 0, second: 0 })
            .plus({ week: 1, day: 4 - basis.weekday })
            .toJSDate();
        }

      // アメダス
      case RequestType.amedas:
        const expiredMinute = (() => {
          if (basis.minute < 10) {
            return 10;
          }
          if (basis.minute < 20) {
            return 20;
          }
          if (basis.minute < 30) {
            return 30;
          }
          if (basis.minute < 40) {
            return 40;
          }
          if (basis.minute < 50) {
            return 50;
          }
          if (basis.minute < 60) {
            return 0;
          }
        })();

        if (expiredMinute === 0) {
          return basis.set({ minute: expiredMinute, second: 0 }).plus({ hour: 1 }).toJSDate();
        }

        return basis.set({ minute: expiredMinute, second: 0 }).toJSDate();
    }
  }
}
