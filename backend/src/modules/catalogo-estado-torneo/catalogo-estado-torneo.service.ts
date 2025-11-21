import { Injectable } from '@nestjs/common';
import { CreateCatalogoEstadoTorneoDto } from './dto/create-catalogo-estado-torneo.dto';
import { UpdateCatalogoEstadoTorneoDto } from './dto/update-catalogo-estado-torneo.dto';

@Injectable()
export class CatalogoEstadoTorneoService {
  create(createCatalogoEstadoTorneoDto: CreateCatalogoEstadoTorneoDto) {
    return 'This action adds a new catalogoEstadoTorneo';
  }

  findAll() {
    return `This action returns all catalogoEstadoTorneo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoEstadoTorneo`;
  }

  update(id: number, updateCatalogoEstadoTorneoDto: UpdateCatalogoEstadoTorneoDto) {
    return `This action updates a #${id} catalogoEstadoTorneo`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoEstadoTorneo`;
  }
}
