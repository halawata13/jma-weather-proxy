import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [CommonService, ConfigService],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a region list', async () => {
    const result = await service.getRegionList();
    expect(result.regionItems).toBeDefined();
  });

  it('should convert a weekAreaCode', async () => {
    const result = await service.convertWeekAreaCode('230010');
    expect(result).toBeDefined();
  });

  it('should convert', async () => {
    const result = await service.convertTwoWeekArea('230010');
    expect(result).toBeDefined();
  });

  it('should return a daily forecast area list', async () => {
    const result = await service.convertSeasonArea('230010');
    expect(result).toBeDefined();
  });
});
