import { Injectable } from '@nestjs/common';
import { CreateCatalogoGeneroDto } from './dto/create-catalogo-genero.dto';
import { UpdateCatalogoGeneroDto } from './dto/update-catalogo-genero.dto';

@Injectable()
export class CatalogoGeneroService {
  create(createCatalogoGeneroDto: CreateCatalogoGeneroDto) {
    return 'This action adds a new catalogoGenero';
  }

  findAll() {
    return `This action returns all catalogoGenero`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoGenero`;
  }

  update(id: number, updateCatalogoGeneroDto: UpdateCatalogoGeneroDto) {
    return `This action updates a #${id} catalogoGenero`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoGenero`;
  }
}
