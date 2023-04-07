import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JmaForecastData } from './forecast.type';
import { Forecast, WeeklyForecast } from './forecast.schema';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { RequestService, RequestType } from '../infrastructure/request.service';
import { CommonService } from '../common/common.service';
import { jmaWeatherCodeImgMap } from '../common/common.data';

@Injectable()
export class ForecastService {
  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * 明日までの天気予報を取得する
   *
   * @param areaCode
   */
  async getForecast(areaCode: string): Promise<Forecast> {
    const data = await this.getData(areaCode);

    let areaIndex;
    data[0].timeSeries[0].areas.forEach((area, i) => {
      if (area.area.code === areaCode) {
        areaIndex = i;
      }
    });

    if (areaIndex === undefined) {
      throw new NotFoundException();
    }

    // 予報エリア名
    const areaName = data[0].timeSeries[2].areas[areaIndex].area.name;
    // 発表日時
    const reportDatetime = DateTime.fromISO(data[0].reportDatetime);
    const reportDatetimeString = reportDatetime.toISO();

    // 予報日付
    const dates = (() => {
      if (reportDatetime.hour === 5) {
        return data[0].timeSeries[0].timeDefines;
      }

      return data[0].timeSeries[0].timeDefines.slice(0, -1);
    })();

    // 天気コード
    const weatherCodes = data[0].timeSeries[0].areas[areaIndex].weatherCodes.slice(-2);
    // 天気説明文
    const weathers = data[0].timeSeries[0].areas[areaIndex].weathers.slice(-2);
    // 風
    const winds = data[0].timeSeries[0].areas[areaIndex].winds.slice(-2);
    // 波
    const waves = data[0].timeSeries[0].areas[areaIndex].waves?.slice(-2);

    // 降水確率
    const p = data[0].timeSeries[1].areas[areaIndex].pops.map((v) => (v ? Number(v) : -1));
    const pops: number[][] = (() => {
      if (reportDatetime.hour === 17) {
        return [[-1, -1, -1, ...p.slice(0, 1)], p.slice(1, 5)];
      } else if (reportDatetime.hour === 5) {
        return [[-1, ...p.slice(0, 3)], p.slice(3, 7)];
      } else {
        return [[-1, -1, ...p.slice(0, 2)], p.slice(2, 6)];
      }
    })();

    // 気温
    const t = data[0].timeSeries[2].areas[areaIndex].temps;
    const [tempsMins, tempsMaxs] = (() => {
      if (reportDatetime.hour === 17) {
        const tempsMins = [null, t[0]];
        const tempsMaxs = [null, t[1]];
        return [tempsMins, tempsMaxs];
      } else {
        const tempsMins = [null, t[2]];
        const tempsMaxs = [t[1], t[3]];
        return [tempsMins, tempsMaxs];
      }
    })();

    const items = dates.map((date, i) => ({
      date: DateTime.fromISO(date).toISODate() ?? '',
      weatherCode: weatherCodes[i] ?? null,
      weather: weathers[i] ?? null,
      jmaWeatherImgCode: jmaWeatherCodeImgMap[weatherCodes[i]][0] ?? null,
      wind: winds[i] ?? null,
      wave: waves?.[i] ?? null,
      pop: pops[i],
      tempMin: tempsMins[i] ? Number(tempsMins[i]) : null,
      tempMax: tempsMaxs[i] ? Number(tempsMaxs[i]) : null,
    }));

    return {
      items,
      reportDatetime: reportDatetimeString ?? '',
      areaCode,
      areaName,
    };
  }

  /**
   * 週間天気予報を取得する
   *
   * @param areaCode
   */
  async getWeeklyForecast(areaCode: string): Promise<WeeklyForecast> {
    const weekAreaCode = await this.commonService.convertWeekAreaCode(areaCode);
    const data = await this.getData(weekAreaCode);

    let areaIndex;
    data[1].timeSeries[0].areas.forEach((area, i) => {
      if (area.area.code === weekAreaCode) {
        areaIndex = i;
      }
    });

    if (areaIndex === undefined) {
      throw new NotFoundException();
    }

    const areaName = data[1].timeSeries[1].areas[areaIndex].area.name;
    const reportDatetime = DateTime.fromISO(data[1].reportDatetime).toISO();

    const dates = data[1].timeSeries[0].timeDefines;
    const weatherCodes = data[1].timeSeries[0].areas[areaIndex].weatherCodes;
    const pops = data[1].timeSeries[0].areas[areaIndex].pops;
    const reliabilities = data[1].timeSeries[0].areas[areaIndex].reliabilities;
    const tempsMins = data[1].timeSeries[1].areas[areaIndex].tempsMin;
    const tempsMinUppers = data[1].timeSeries[1].areas[areaIndex].tempsMinUpper;
    const tempsMinLowers = data[1].timeSeries[1].areas[areaIndex].tempsMinLower;
    const tempsMaxs = data[1].timeSeries[1].areas[areaIndex].tempsMax;
    const tempsMaxUppers = data[1].timeSeries[1].areas[areaIndex].tempsMaxUpper;
    const tempsMaxLowers = data[1].timeSeries[1].areas[areaIndex].tempsMaxLower;

    const items = dates
      .map((date, i) => ({
        date: DateTime.fromISO(date).toISODate() ?? '',
        weatherCode: weatherCodes[i] ?? null,
        jmaWeatherImgCode: jmaWeatherCodeImgMap[weatherCodes[i]][0] ?? null,
        pop: pops[i] ? Number(pops[i]) : null,
        reliability: reliabilities[i] ?? null,
        tempMin: tempsMins[i] ? Number(tempsMins[i]) : null,
        tempMinUpper: tempsMinUppers[i] ? Number(tempsMinUppers[i]) : null,
        tempMinLower: tempsMinLowers[i] ? Number(tempsMinLowers[i]) : null,
        tempMax: tempsMaxs[i] ? Number(tempsMaxs[i]) : null,
        tempMaxUpper: tempsMaxUppers[i] ? Number(tempsMaxUppers[i]) : null,
        tempMaxLower: tempsMaxLowers[i] ? Number(tempsMaxLowers[i]) : null,
      }))
      .filter((v) => v.tempMax !== null);

    return {
      items,
      reportDatetime: reportDatetime ?? '',
      weekAreaCode: weekAreaCode,
      weekAreaName: areaName,
    };
  }

  private async getData(weekAreaCode: string) {
    const prefCode = weekAreaCode.slice(0, 2);
    const url = this.configService.get<string>('jmaUrl.forecast')?.replace('{PREF_CODE}', prefCode);
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }

    return this.requestService.request<JmaForecastData>(RequestType.forecast, url);
  }
}
