import { Test, TestingModule } from '@nestjs/testing';
import { SeasonService } from './season.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

describe('SeasonService', () => {
  let service: SeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [SeasonService, ConfigService],
    }).compile();

    service = module.get<SeasonService>(SeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 1 month forecast', async () => {
    const result = await service.get1Month('230010');
    expect(result.items).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.targetDatetime).toBeDefined();
    expect(result.seasonAreaCode).toStrictEqual('010400');
    expect(result.seasonAreaName).toBeDefined();
  });

  it('should return 3 months forecast', async () => {
    const result = await service.get1Month('230010');
    expect(result.items).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.targetDatetime).toBeDefined();
    expect(result.seasonAreaCode).toStrictEqual('010400');
    expect(result.seasonAreaName).toBeDefined();
  });

  it('should return 6 months forecast', async () => {
    const result = await service.get1Month('230010');
    expect(result.items).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.targetDatetime).toBeDefined();
    expect(result.seasonAreaCode).toStrictEqual('010400');
    expect(result.seasonAreaName).toBeDefined();
  });
});
