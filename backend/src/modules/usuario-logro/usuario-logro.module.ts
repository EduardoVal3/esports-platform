import { Module } from '@nestjs/common';
import { UsuarioLogroService } from './usuario-logro.service';
import { UsuarioLogroController } from './usuario-logro.controller';

@Module({
  controllers: [UsuarioLogroController],
  providers: [UsuarioLogroService],
})
export class UsuarioLogroModule {}
