import { Test, TestingModule } from '@nestjs/testing';
import { LobbiesGateway } from './lobbies.gateway';

describe('LobbiesGateway', () => {
  let gateway: LobbiesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbiesGateway],
    }).compile();

    gateway = module.get<LobbiesGateway>(LobbiesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
