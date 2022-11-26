import { Test, TestingModule } from '@nestjs/testing';
import { AmedasService } from './amedas.service';

describe('AmedasService', () => {
  let service: AmedasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmedasService],
    }).compile();

    service = module.get<AmedasService>(AmedasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
