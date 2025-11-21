import { Injectable } from '@nestjs/common';
import { CreateTorneoInscripcionDto } from './dto/create-torneo-inscripcion.dto';
import { UpdateTorneoInscripcionDto } from './dto/update-torneo-inscripcion.dto';

@Injectable()
export class TorneoInscripcionService {
  create(createTorneoInscripcionDto: CreateTorneoInscripcionDto) {
    return 'This action adds a new torneoInscripcion';
  }

  findAll() {
    return `This action returns all torneoInscripcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} torneoInscripcion`;
  }

  update(id: number, updateTorneoInscripcionDto: UpdateTorneoInscripcionDto) {
    return `This action updates a #${id} torneoInscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} torneoInscripcion`;
  }
}
