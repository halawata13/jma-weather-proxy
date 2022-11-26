import { Test, TestingModule } from '@nestjs/testing';
import { ForecastResolver } from './forecast.resolver';
import { ForecastService } from './forecast.service';
import { ForecastItem, WeeklyForecastItem } from './forecast.schema';

describe('ForecastResolver', () => {
  let resolver: ForecastResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForecastResolver,
        {
          provide: ForecastService,
          useClass: class {
            getForecast(): Promise<ForecastItem[]> {
              return Promise.resolve([]);
            }

            getWeeklyForecast(): Promise<WeeklyForecastItem[]> {
              return Promise.resolve([]);
            }
          },
        },
      ],
    }).compile();

    resolver = module.get<ForecastResolver>(ForecastResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a daily forecast query', async () => {
    const result = await resolver.daily('0');
    expect(result.items).toStrictEqual([]);
    expect(result.areaCode).toStrictEqual('0');
  });

  it('should return a weekly forecast query', async () => {
    const result = await resolver.weekly('0');
    expect(result.items).toStrictEqual([]);
    expect(result.weekAreaCode).toStrictEqual('0');
  });
});
