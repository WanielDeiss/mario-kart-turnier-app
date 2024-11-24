import { Test, TestingModule } from '@nestjs/testing';
import { TurnierService } from './turnier.service';

describe('TurnierService', () => {
  let service: TurnierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnierService],
    }).compile();

    service = module.get<TurnierService>(TurnierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
