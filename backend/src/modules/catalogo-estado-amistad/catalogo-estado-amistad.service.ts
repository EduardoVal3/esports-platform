import { Injectable } from '@nestjs/common';
import { CreateCatalogoEstadoAmistadDto } from './dto/create-catalogo-estado-amistad.dto';
import { UpdateCatalogoEstadoAmistadDto } from './dto/update-catalogo-estado-amistad.dto';

@Injectable()
export class CatalogoEstadoAmistadService {
  create(createCatalogoEstadoAmistadDto: CreateCatalogoEstadoAmistadDto) {
    return 'This action adds a new catalogoEstadoAmistad';
  }

  findAll() {
    return `This action returns all catalogoEstadoAmistad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoEstadoAmistad`;
  }

  update(id: number, updateCatalogoEstadoAmistadDto: UpdateCatalogoEstadoAmistadDto) {
    return `This action updates a #${id} catalogoEstadoAmistad`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoEstadoAmistad`;
  }
}
