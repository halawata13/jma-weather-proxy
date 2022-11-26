import { Test, TestingModule } from '@nestjs/testing';
import { TwoWeekService } from './two-week.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

describe('TwoWeekService', () => {
  let service: TwoWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [TwoWeekService, ConfigService],
    }).compile();

    service = module.get<TwoWeekService>(TwoWeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return two weeks forecast', async () => {
    const result = await service.getTwoWeekForecast('47636');
    expect(result.week1).toBeDefined();
    expect(result.week2).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.twoWeekAreaCode).toBeDefined();
    expect(result.twoWeekAreaName).toBeDefined();
  });
});
