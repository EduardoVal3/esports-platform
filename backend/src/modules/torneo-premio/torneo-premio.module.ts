import { Module } from '@nestjs/common';
import { TorneoPremioService } from './torneo-premio.service';
import { TorneoPremioController } from './torneo-premio.controller';

@Module({
  controllers: [TorneoPremioController],
  providers: [TorneoPremioService],
})
export class TorneoPremioModule {}
