import { Injectable } from '@nestjs/common';
import { CreateCatalogoEstadoInscripcionDto } from './dto/create-catalogo-estado-inscripcion.dto';
import { UpdateCatalogoEstadoInscripcionDto } from './dto/update-catalogo-estado-inscripcion.dto';

@Injectable()
export class CatalogoEstadoInscripcionService {
  create(createCatalogoEstadoInscripcionDto: CreateCatalogoEstadoInscripcionDto) {
    return 'This action adds a new catalogoEstadoInscripcion';
  }

  findAll() {
    return `This action returns all catalogoEstadoInscripcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoEstadoInscripcion`;
  }

  update(id: number, updateCatalogoEstadoInscripcionDto: UpdateCatalogoEstadoInscripcionDto) {
    return `This action updates a #${id} catalogoEstadoInscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoEstadoInscripcion`;
  }
}
