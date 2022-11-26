import { Test, TestingModule } from '@nestjs/testing';
import { SeasonResolver } from './season.resolver';
import { SeasonService } from './season.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { Season } from './season.schema';

describe('SeasonResolver', () => {
  let resolver: SeasonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [
        SeasonResolver,
        {
          provide: SeasonService,
          useClass: class {
            get1Month(): Promise<Season> {
              return Promise.resolve({
                items: [
                  {
                    fromDate: '',
                    toDate: '',
                    temperature: ['0', '0', '0'],
                    precipitation: ['0', '0', '0'],
                    sunshine: ['0', '0', '0'],
                    snowfall: ['0', '0', '0'],
                  },
                ],
                reportDatetime: '',
                targetDatetime: '',
                seasonAreaCode: '010400',
                seasonAreaName: '',
              });
            }

            get3Months(): Promise<Season> {
              return Promise.resolve({
                items: [
                  {
                    fromDate: '',
                    toDate: '',
                    temperature: ['0', '0', '0'],
                    precipitation: ['0', '0', '0'],
                    sunshine: ['0', '0', '0'],
                    snowfall: ['0', '0', '0'],
                  },
                ],
                reportDatetime: '',
                targetDatetime: '',
                seasonAreaCode: '010400',
                seasonAreaName: '',
              });
            }

            get6Months(): Promise<Season> {
              return Promise.resolve({
                items: [
                  {
                    fromDate: '',
                    toDate: '',
                    temperature: ['0', '0', '0'],
                    precipitation: ['0', '0', '0'],
                    sunshine: ['0', '0', '0'],
                    snowfall: ['0', '0', '0'],
                  },
                ],
                reportDatetime: '',
                targetDatetime: '',
                seasonAreaCode: '010400',
                seasonAreaName: '',
              });
            }
          },
        },
      ],
    }).compile();

    resolver = module.get<SeasonResolver>(SeasonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return 1 month forecast query', async () => {
    const result = await resolver.month1('230010');
    expect(result.items).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.targetDatetime).toBeDefined();
    expect(result.seasonAreaCode).toStrictEqual('010400');
    expect(result.seasonAreaName).toBeDefined();
  });

  it('should return 3 months forecast query', async () => {
    const result = await resolver.month3('230010');
    expect(result.items).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.targetDatetime).toBeDefined();
    expect(result.seasonAreaName).toBeDefined();
  });

  it('should return 6 months forecast query', async () => {
    const result = await resolver.month6('230010');
    expect(result.items).toBeDefined();
    expect(result.reportDatetime).toBeDefined();
    expect(result.targetDatetime).toBeDefined();
    expect(result.seasonAreaName).toBeDefined();
  });
});
