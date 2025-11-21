import { Module } from '@nestjs/common';
import { LogroService } from './logro.service';
import { LogroController } from './logro.controller';

@Module({
  controllers: [LogroController],
  providers: [LogroService],
})
export class LogroModule {}
