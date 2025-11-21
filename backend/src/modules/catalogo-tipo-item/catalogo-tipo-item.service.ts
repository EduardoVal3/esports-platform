import { Injectable } from '@nestjs/common';
import { CreateCatalogoTipoItemDto } from './dto/create-catalogo-tipo-item.dto';
import { UpdateCatalogoTipoItemDto } from './dto/update-catalogo-tipo-item.dto';

@Injectable()
export class CatalogoTipoItemService {
  create(createCatalogoTipoItemDto: CreateCatalogoTipoItemDto) {
    return 'This action adds a new catalogoTipoItem';
  }

  findAll() {
    return `This action returns all catalogoTipoItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoTipoItem`;
  }

  update(id: number, updateCatalogoTipoItemDto: UpdateCatalogoTipoItemDto) {
    return `This action updates a #${id} catalogoTipoItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoTipoItem`;
  }
}
