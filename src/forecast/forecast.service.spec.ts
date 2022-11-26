import { Test, TestingModule } from '@nestjs/testing';
import { ForecastService } from './forecast.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

describe('ForecastService', () => {
  let service: ForecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [ForecastService, ConfigService],
    }).compile();

    service = module.get<ForecastService>(ForecastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return daily forecast values', async () => {
    const result = await service.getForecast('230010');
    expect(result.items.length).toStrictEqual(2);
    expect(result.reportDatetime).toBeDefined();
    expect(result.areaCode).toBeDefined();
    expect(result.areaName).toBeDefined();
  });

  it('should return weekly forecast values', async () => {
    const result = await service.getWeeklyForecast('230010');
    expect(result.items.length).toStrictEqual(6);
    expect(result.reportDatetime).toBeDefined();
    expect(result.weekAreaCode).toBeDefined();
    expect(result.weekAreaName).toBeDefined();
  });
});
