import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JmaSeason6MData, JmaSeasonData, JmaSeasonDataBase } from './season.type';
import { Season, SeasonItem } from './season.schema';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { RequestService, RequestType } from '../infrastructure/request.service';
import { CommonService } from '../common/common.service';

@Injectable()
export class SeasonService {
  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * 1か月予報を取得する
   *
   * @param areaCode
   */
  async get1Month(areaCode: string): Promise<Season> {
    const seasonArea = await this.commonService.convertSeasonArea(areaCode);
    const data = await this.getData<JmaSeasonData>('P1M');

    const date0 = DateTime.fromISO(data.timeDefines[0]);
    const item0: SeasonItem = {
      fromDate: date0.toISODate(),
      toDate: date0.plus({ month: 1, day: -1 }).toISODate(),
      temperature: data.temperature[seasonArea.areaCode][0],
      precipitation: data.precipitation?.[seasonArea.areaCode][0],
      sunshine: data.sunshine?.[seasonArea.areaCode]?.[0],
      snowfall: data.snowfall?.[seasonArea.areaCode]?.[0],
    };

    const items: SeasonItem[] = data.timeDefines.map((timeDefines, i) => {
      const date = DateTime.fromISO(timeDefines);

      return {
        fromDate: date.toISODate(),
        toDate: date.plus({ day: i > 1 ? 13 : 6 }).toISODate(),
        temperature: data.temperature[seasonArea.areaCode][i + 1],
      };
    });

    return {
      items: [item0, ...items],
      reportDatetime: data.reportDatetime,
      targetDatetime: data.targetDatetime,
      seasonAreaCode: seasonArea.areaCode,
      seasonAreaName: seasonArea.areaName,
    };
  }

  /**
   * 3か月予報を取得する
   *
   * @param areaCode
   */
  async get3Months(areaCode: string): Promise<Season> {
    const seasonArea = await this.commonService.convertSeasonArea(areaCode);
    const data = await this.getData<JmaSeasonData>('P3M');

    const date0 = DateTime.fromISO(data.timeDefines[0]);
    const item0: SeasonItem = {
      fromDate: date0.toISODate(),
      toDate: date0.plus({ month: 3, day: -1 }).toISODate(),
      temperature: data.temperature[seasonArea.areaCode][0],
      precipitation: data.precipitation?.[seasonArea.areaCode][0],
      sunshine: data.sunshine?.[seasonArea.areaCode]?.[0],
      snowfall: data.snowfall?.[seasonArea.areaCode]?.[0],
    };

    const items: SeasonItem[] = data.timeDefines.map((timeDefines, i) => {
      const date = DateTime.fromISO(timeDefines);

      return {
        fromDate: date.toISODate(),
        toDate: date.plus({ month: 1, day: -1 }).toISODate(),
        temperature: data.temperature[seasonArea.areaCode][i + 1],
      };
    });

    return {
      items: [item0, ...items],
      reportDatetime: data.reportDatetime,
      targetDatetime: data.targetDatetime,
      seasonAreaCode: seasonArea.areaCode,
      seasonAreaName: seasonArea.areaName,
    };
  }

  /**
   * 寒候期/暖候期予報を取得する
   *
   * @param areaCode
   */
  async get6Months(areaCode: string): Promise<Season> {
    const seasonArea = await this.commonService.convertSeasonArea(areaCode);
    const data = await this.getData<JmaSeason6MData>('P6M');
    const targetDatetime = DateTime.fromISO(data.targetDatetime);
    const date = targetDatetime.month === 3 ? targetDatetime.set({ month: 6 }) : targetDatetime.set({ month: 12 });

    return {
      items: [
        {
          fromDate: date.toISODate(),
          toDate: date.plus({ month: 3, day: -1 }).toISODate(),
          temperature: data.temperature[seasonArea.areaCode][0],
          precipitation: data.precipitation?.[seasonArea.areaCode][0],
          sunshine: data.sunshine?.[seasonArea.areaCode]?.[0],
          snowfall: data.snowfall?.[seasonArea.areaCode]?.[0],
        },
      ],
      reportDatetime: data.reportDatetime,
      targetDatetime: data.targetDatetime,
      seasonAreaCode: seasonArea.areaCode,
      seasonAreaName: seasonArea.areaName,
    };
  }

  private async getData<T extends JmaSeasonDataBase>(range: 'P1M' | 'P3M' | 'P6M') {
    const url = this.configService.get<string>('jmaUrl.seasonForecast')?.replace('{RANGE}', range);
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }
    return this.requestService.request<T>(RequestType.seasonForecast, url);
  }
}
