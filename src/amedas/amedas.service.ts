import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RequestService, RequestType } from '../infrastructure/request.service';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { Amedas } from './amedas.schema';
import { JmaAmedasData, JmaAmedasTable } from './amedas.type';

@Injectable()
export class AmedasService {
  constructor(private readonly configService: ConfigService, private readonly requestService: RequestService) {}

  /**
   * アメダスを取得する
   *
   * @param amedasCode
   */
  async getAmedas(amedasCode: string): Promise<Amedas> {
    const [data, amedasTable] = await Promise.all([this.getData(amedasCode), this.getAmedasTable()]).catch(() => {
      throw new NotFoundException();
    });
    const key = Object.keys(data)[0];
    const values = Object.values(data)[0];
    const amedasName = amedasTable[amedasCode].kjName;
    if (!key || !values || !amedasName) {
      throw new NotFoundException();
    }

    const reportDatetime = DateTime.fromFormat(key, 'yyyyMMddHHmmss').toISO();

    // 最高気温、最低気温、最大瞬間風速の時間はUTCなのでJSTに直す
    const maxTempTime = (() => {
      if (values.maxTempTime.hour === null || values.maxTempTime.minute === null) {
        return null;
      }

      return DateTime.now()
        .setZone('UTC')
        .set({ hour: values.maxTempTime.hour, minute: values.maxTempTime.minute })
        .setZone('Asia/Tokyo');
    })();
    const minTempTime = (() => {
      if (values.minTempTime.hour === null || values.minTempTime.minute === null) {
        return null;
      }

      return DateTime.now()
        .setZone('UTC')
        .set({ hour: values.minTempTime.hour, minute: values.minTempTime.minute })
        .setZone('Asia/Tokyo');
    })();
    const gustTime = (() => {
      if (values.gustTime.hour === null || values.gustTime.minute === null) {
        return null;
      }

      return DateTime.now()
        .setZone('UTC')
        .set({ hour: values.gustTime.hour, minute: values.gustTime.minute })
        .setZone('Asia/Tokyo');
    })();

    return {
      pressure: values.pressure?.[0] ?? null,
      normalPressure: values.pressure?.[0] ?? null,
      temp: values.temp?.[0] ?? null,
      humidity: values.humidity?.[0] ?? null,
      snow: values.snow?.[0] ?? null,
      snow1h: values.snow1h[0],
      snow6h: values.snow6h[0],
      snow12h: values.snow12h[0],
      snow24h: values.snow24h[0],
      sun10m: values.sun10m?.[0] ?? null,
      sun1h: values.sun1h?.[0] ?? null,
      precipitation10m: values.precipitation10m[0],
      precipitation1h: values.precipitation1h[0],
      precipitation3h: values.precipitation3h[0],
      precipitation24h: values.precipitation24h[0],
      windDirection: values.windDirection?.[0] ?? null,
      wind: values.wind?.[0] ?? null,
      maxTempTimeHour: maxTempTime?.hour ?? null,
      maxTempTimeMinute: maxTempTime?.minute ?? null,
      maxTemp: values.maxTemp?.[0] ?? null,
      minTempTimeHour: minTempTime?.hour ?? null,
      minTempTimeMinute: minTempTime?.minute ?? null,
      minTemp: values.minTemp?.[0] ?? null,
      gustTimeHour: gustTime?.hour ?? null,
      gustTimeMinute: gustTime?.minute ?? null,
      gustDirection: values.gustDirection?.[0] ?? null,
      gust: values.gust?.[0] ?? null,
      reportDatetime,
      amedasCode,
      amedasName,
    };
  }

  public getDatetimeCode() {
    const now = DateTime.now();
    const hour = (() => {
      if (now.hour < 3) {
        return '00';
      } else if (now.hour < 6) {
        return '03';
      } else if (now.hour < 9) {
        return '06';
      } else if (now.hour < 12) {
        return '09';
      } else if (now.hour < 15) {
        return '12';
      } else if (now.hour < 18) {
        return '15';
      } else if (now.hour < 21) {
        return '18';
      } else {
        return '21';
      }
    })();

    return `${now.toFormat('yyyyMMdd')}_${hour}`;
  }

  private async getData(amedasCode: string) {
    const url = this.configService
      .get<string>('jmaUrl.amedas')
      ?.replace('{AMEDAS_CODE}', amedasCode)
      .replace('{DATETIME}', this.getDatetimeCode());
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }
    return this.requestService.request<JmaAmedasData>(RequestType.amedas, url);
  }

  private async getAmedasTable() {
    const url = this.configService.get<string>('jmaUrl.amedasTable');
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }
    return this.requestService.request<JmaAmedasTable>(RequestType.amedasTable, url);
  }
}
