import { Test, TestingModule } from '@nestjs/testing';
import { AmedasResolver } from './amedas.resolver';

describe('AmedasResolver', () => {
  let resolver: AmedasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmedasResolver],
    }).compile();

    resolver = module.get<AmedasResolver>(AmedasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
