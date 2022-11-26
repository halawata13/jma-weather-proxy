import { Test, TestingModule } from '@nestjs/testing';
import { TwoWeekResolver } from './two-week.resolver';
import { TwoWeekService } from './two-week.service';
import { TwoWeekForecast } from './two-week.schema';

describe('TwoWeekResolver', () => {
  let resolver: TwoWeekResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwoWeekResolver,
        {
          provide: TwoWeekService,
          useClass: class {
            getTwoWeekForecast(): Promise<TwoWeekForecast> {
              return Promise.resolve({
                week1: [],
                week2: [],
                reportDatetime: '',
                twoWeekAreaName: '',
                twoWeekAreaCode: '',
              });
            }
          },
        },
      ],
    }).compile();

    resolver = module.get<TwoWeekResolver>(TwoWeekResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return two weeks forecast query', async () => {
    const result = await resolver.twoWeek('230010');
    expect(result.week1).toBeDefined();
    expect(result.week2).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.twoWeekAreaCode).toBeDefined();
    expect(result.twoWeekAreaName).toBeDefined();
  });
});
