import { Module } from '@nestjs/common';
import { UsuarioMembresiaService } from './usuario-membresia.service';
import { UsuarioMembresiaController } from './usuario-membresia.controller';

@Module({
  controllers: [UsuarioMembresiaController],
  providers: [UsuarioMembresiaService],
})
export class UsuarioMembresiaModule {}
