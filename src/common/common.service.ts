import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JmaArea, JmaForecastArea, JmaWeekArea05 } from './common.type';
import { Area, Pref, Region, RegionList } from './common.schema';
import { twoweekArea } from './common.data';
import { ConfigService } from '@nestjs/config';
import { RequestService, RequestType } from '../infrastructure/request.service';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService, private readonly requestService: RequestService) {}

  async getRegionList(): Promise<RegionList> {
    const [area, forecastArea] = await Promise.all([this.getJmaArea(), this.getJmaForecastArea()]);

    const prefItems: Pref[] = Object.entries(forecastArea)
      .flatMap(([prefCode, class10values]) => {
        const prefName = area.offices[prefCode]?.name;
        const regionCode = area.offices[prefCode]?.parent;
        const regionName = area.centers[area.offices[prefCode]?.parent]?.name;

        const areaItems: Area[] = class10values.map((item) => ({
          regionName,
          prefName,
          areaName: area.class10s[item.class10]?.name,
          areaCode: item.class10,
        }));

        return {
          regionCode,
          regionName,
          prefCode,
          prefName,
          areaItems,
        };
      })
      .sort((a, b) => (a.prefCode > b.prefCode ? 1 : -1));

    const regionMap = new Map<string, Pref[]>();
    prefItems.forEach((prefItem) => {
      regionMap.set(prefItem.regionCode, (regionMap.get(prefItem.regionCode) ?? []).concat([prefItem]));
    });

    const regionItems: Region[] = Array.from(regionMap.values()).map((prefItems) => {
      return {
        prefItems,
        regionCode: prefItems[0].regionCode,
        regionName: prefItems[0].regionName,
      };
    });

    return {
      regionItems,
    };
  }

  async convertWeekAreaCode(dailyAreaCode: string): Promise<string> {
    const weekArea05Json = await this.getJmaWeekArea05();

    const weekAreaCode = weekArea05Json[dailyAreaCode]?.[0];
    if (!weekAreaCode) {
      throw new NotFoundException();
    }

    return weekAreaCode;
  }

  async convertTwoWeekArea(dailyAreaCode: string): Promise<{ areaCode: string; areaName: string }> {
    if (!twoweekArea[dailyAreaCode]) {
      throw new NotFoundException();
    }

    return {
      areaCode: twoweekArea[dailyAreaCode].twoWeekAreaCode,
      areaName: twoweekArea[dailyAreaCode].twoWeekAreaName,
    };
  }

  async convertSeasonArea(dailyAreaCode: string): Promise<{ areaCode: string; areaName: string }> {
    const areaJson = await this.getJmaArea();

    let seasonAreaCode: string | null = null;
    Object.values(areaJson.offices).forEach((office) => {
      office.children.forEach((child) => {
        if (child === dailyAreaCode) {
          seasonAreaCode = office.parent;
        }
      });
    });

    if (!seasonAreaCode) {
      throw new NotFoundException();
    }

    const seasonAreaName = areaJson.centers[seasonAreaCode]?.name;

    if (!seasonAreaName) {
      throw new NotFoundException();
    }

    return {
      areaCode: seasonAreaCode,
      areaName: seasonAreaName,
    };
  }

  async convertAmedasCode(dailyAreaCode: string): Promise<string> {
    const code = twoweekArea[dailyAreaCode]?.amedasCode;
    if (!code) {
      throw new NotFoundException();
    }

    return code;
  }

  private async getJmaForecastArea() {
    const url = this.configService.get<string>('jmaUrl.forecastArea');
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }

    return this.requestService.request<JmaForecastArea>(RequestType.forecastArea, url);
  }

  private async getJmaWeekArea05() {
    const url = this.configService.get<string>('jmaUrl.weekArea05');
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }

    return this.requestService.request<JmaWeekArea05>(RequestType.weekArea05, url);
  }

  private async getJmaArea() {
    const url = this.configService.get<string>('jmaUrl.area');
    if (url === undefined) {
      throw new InternalServerErrorException('No configuration set');
    }

    return this.requestService.request<JmaArea>(RequestType.area, url);
  }
}
