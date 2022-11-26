import { Test, TestingModule } from '@nestjs/testing';
import { RequestService, RequestType } from './request.service';
import { PrismaService } from '../database/prisma.service';
import { DateTime } from 'luxon';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [
        RequestService,
        ConfigService,
        {
          provide: PrismaService,
          useClass: class {},
        },
      ],
    }).compile();

    service = module.get<RequestService>(RequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return expired datetime for area', () => {
    let result: DateTime;
    result = DateTime.fromJSDate(service.getExpiredDateTime(RequestType.area, DateTime.local(2022, 8, 31)));
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(9);
    expect(result.day).toStrictEqual(1);
  });

  it('should return expired datetime for forecastArea', () => {
    let result: DateTime;
    result = DateTime.fromJSDate(service.getExpiredDateTime(RequestType.forecastArea, DateTime.local(2022, 8, 31)));
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(9);
    expect(result.day).toStrictEqual(1);
  });

  it('should return expired datetime for forecast', () => {
    let result: DateTime;
    result = DateTime.fromJSDate(service.getExpiredDateTime(RequestType.forecast, DateTime.local(2022, 8, 31, 0)));
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(8);
    expect(result.day).toStrictEqual(31);
    expect(result.hour).toStrictEqual(5);

    result = DateTime.fromJSDate(service.getExpiredDateTime(RequestType.forecast, DateTime.local(2022, 8, 31, 5)));
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(8);
    expect(result.day).toStrictEqual(31);
    expect(result.hour).toStrictEqual(11);

    result = DateTime.fromJSDate(service.getExpiredDateTime(RequestType.forecast, DateTime.local(2022, 8, 31, 11)));
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(8);
    expect(result.day).toStrictEqual(31);
    expect(result.hour).toStrictEqual(17);

    result = DateTime.fromJSDate(service.getExpiredDateTime(RequestType.forecast, DateTime.local(2022, 8, 31, 17)));
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(9);
    expect(result.day).toStrictEqual(1);
    expect(result.hour).toStrictEqual(5);
  });

  it('should return expired datetime for two week forecast', () => {
    let result: DateTime;
    result = DateTime.fromJSDate(
      service.getExpiredDateTime(RequestType.twoWeekForecast, DateTime.local(2022, 8, 31, 14)),
    );
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(8);
    expect(result.day).toStrictEqual(31);
    expect(result.hour).toStrictEqual(15);

    result = DateTime.fromJSDate(
      service.getExpiredDateTime(RequestType.twoWeekForecast, DateTime.local(2022, 8, 31, 15)),
    );
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(9);
    expect(result.day).toStrictEqual(1);
    expect(result.hour).toStrictEqual(15);
  });

  it('should return expired datetime for seasonForecast', () => {
    let result: DateTime;
    result = DateTime.fromJSDate(
      service.getExpiredDateTime(RequestType.seasonForecast, DateTime.local(2022, 8, 31, 14)),
    );
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(9);
    expect(result.day).toStrictEqual(1);
    expect(result.hour).toStrictEqual(15);

    result = DateTime.fromJSDate(
      service.getExpiredDateTime(RequestType.seasonForecast, DateTime.local(2022, 9, 1, 14)),
    );
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(9);
    expect(result.day).toStrictEqual(1);
    expect(result.hour).toStrictEqual(15);

    result = DateTime.fromJSDate(
      service.getExpiredDateTime(RequestType.seasonForecast, DateTime.local(2022, 9, 1, 15)),
    );
    expect(result.year).toStrictEqual(2022);
    expect(result.month).toStrictEqual(9);
    expect(result.day).toStrictEqual(8);
    expect(result.hour).toStrictEqual(15);
  });
});
