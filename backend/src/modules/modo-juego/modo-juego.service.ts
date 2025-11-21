import { Injectable } from '@nestjs/common';
import { CreateModoJuegoDto } from './dto/create-modo-juego.dto';
import { UpdateModoJuegoDto } from './dto/update-modo-juego.dto';

@Injectable()
export class ModoJuegoService {
  create(createModoJuegoDto: CreateModoJuegoDto) {
    return 'This action adds a new modoJuego';
  }

  findAll() {
    return `This action returns all modoJuego`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modoJuego`;
  }

  update(id: number, updateModoJuegoDto: UpdateModoJuegoDto) {
    return `This action updates a #${id} modoJuego`;
  }

  remove(id: number) {
    return `This action removes a #${id} modoJuego`;
  }
}
