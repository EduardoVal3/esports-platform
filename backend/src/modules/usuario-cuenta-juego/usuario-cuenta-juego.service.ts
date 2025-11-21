import { Injectable } from '@nestjs/common';
import { CreateUsuarioCuentaJuegoDto } from './dto/create-usuario-cuenta-juego.dto';
import { UpdateUsuarioCuentaJuegoDto } from './dto/update-usuario-cuenta-juego.dto';

@Injectable()
export class UsuarioCuentaJuegoService {
  create(createUsuarioCuentaJuegoDto: CreateUsuarioCuentaJuegoDto) {
    return 'This action adds a new usuarioCuentaJuego';
  }

  findAll() {
    return `This action returns all usuarioCuentaJuego`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioCuentaJuego`;
  }

  update(id: number, updateUsuarioCuentaJuegoDto: UpdateUsuarioCuentaJuegoDto) {
    return `This action updates a #${id} usuarioCuentaJuego`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioCuentaJuego`;
  }
}
