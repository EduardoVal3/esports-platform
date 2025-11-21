import { Injectable } from '@nestjs/common';
import { CreateTorneoResultadoDto } from './dto/create-torneo-resultado.dto';
import { UpdateTorneoResultadoDto } from './dto/update-torneo-resultado.dto';

@Injectable()
export class TorneoResultadoService {
  create(createTorneoResultadoDto: CreateTorneoResultadoDto) {
    return 'This action adds a new torneoResultado';
  }

  findAll() {
    return `This action returns all torneoResultado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} torneoResultado`;
  }

  update(id: number, updateTorneoResultadoDto: UpdateTorneoResultadoDto) {
    return `This action updates a #${id} torneoResultado`;
  }

  remove(id: number) {
    return `This action removes a #${id} torneoResultado`;
  }
}
