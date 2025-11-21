import { Injectable } from '@nestjs/common';
import { CreateUsuarioEstadisticaJuegoDto } from './dto/create-usuario-estadistica-juego.dto';
import { UpdateUsuarioEstadisticaJuegoDto } from './dto/update-usuario-estadistica-juego.dto';

@Injectable()
export class UsuarioEstadisticaJuegoService {
  create(createUsuarioEstadisticaJuegoDto: CreateUsuarioEstadisticaJuegoDto) {
    return 'This action adds a new usuarioEstadisticaJuego';
  }

  findAll() {
    return `This action returns all usuarioEstadisticaJuego`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioEstadisticaJuego`;
  }

  update(id: number, updateUsuarioEstadisticaJuegoDto: UpdateUsuarioEstadisticaJuegoDto) {
    return `This action updates a #${id} usuarioEstadisticaJuego`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioEstadisticaJuego`;
  }
}
