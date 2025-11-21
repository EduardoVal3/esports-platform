import { Module } from '@nestjs/common';
import { TorneoRedService } from './torneo-red.service';
import { TorneoRedController } from './torneo-red.controller';

@Module({
  controllers: [TorneoRedController],
  providers: [TorneoRedService],
})
export class TorneoRedModule {}
