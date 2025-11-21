import { Injectable } from '@nestjs/common';
import { CreateCatalogoRolDto } from './dto/create-catalogo-rol.dto';
import { UpdateCatalogoRolDto } from './dto/update-catalogo-rol.dto';

@Injectable()
export class CatalogoRolService {
  create(createCatalogoRolDto: CreateCatalogoRolDto) {
    return 'This action adds a new catalogoRol';
  }

  findAll() {
    return `This action returns all catalogoRol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoRol`;
  }

  update(id: number, updateCatalogoRolDto: UpdateCatalogoRolDto) {
    return `This action updates a #${id} catalogoRol`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoRol`;
  }
}
