import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TwoWeekForecast, TwoWeekForecastItem } from './two-week.schema';
import { JmaTwoWeekData } from './two-week.type';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';
import { RequestService, RequestType } from '../infrastructure/request.service';
import { CommonService } from '../common/common.service';

@Injectable()
export class TwoWeekService {
  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * 2週間気温予報を取得する
   *
   * @param areaCode
   */
  async getTwoWeekForecast(areaCode: string): Promise<TwoWeekForecast> {
    const twoWeekArea = await this.commonService.convertTwoWeekArea(areaCode);
    const data = await this.getData(twoWeekArea.areaCode);

    const reportDatetime = DateTime.local(
      data.reportDate.yy,
      data.reportDate.mm,
      data.reportDate.dd,
      data.reportDate.hh,
    ).toISO();

    const [week1, week2] = [data.wk1, data.wk2].map((weekData) => {
      const weekMap = new Map<string, TwoWeekForecastItem>();
      weekData.forEach((row) => {
        if (row.lower === undefined || row.upper === undefined) {
          return;
        }

        const date = DateTime.local(row.yy, row.mm, row.dd).toISODate() ?? '';
        let values: Partial<TwoWeekForecastItem> = weekMap.get(date) ?? {};
        values.date = date ?? '';

        if (row.elem === 2) {
          // 最高気温
          values = {
            ...values,
            tempMax: row.fcst,
            tempMaxLower: row.lower,
            tempMaxUpper: row.upper,
            tempMaxNormal: row.nrm,
          };
        } else if (row.elem === 3) {
          // 最高気温
          values = {
            ...values,
            tempMin: row.fcst,
            tempMinLower: row.lower,
            tempMinUpper: row.upper,
            tempMinNormal: row.nrm,
          };
        } else {
          throw new Error();
        }

        weekMap.set(date ?? '', values as TwoWeekForecastItem);
      });

      return Array.from(weekMap.values());
    });

    return {
      week1,
      week2,
      reportDatetime: reportDatetime ?? '',
      twoWeekAreaCode: twoWeekArea.areaCode,
      twoWeekAreaName: twoWeekArea.areaName,
    };
  }

  private async getData(twoWeekCode: string) {
    const url = this.configService.get<string>('jmaUrl.twoWeekForecast')?.replace('{AREA_CODE}', twoWeekCode);
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }
    return this.requestService.request<JmaTwoWeekData>(RequestType.twoWeekForecast, url);
  }
}
