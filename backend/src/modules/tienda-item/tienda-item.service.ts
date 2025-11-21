import { Injectable } from '@nestjs/common';
import { CreateTiendaItemDto } from './dto/create-tienda-item.dto';
import { UpdateTiendaItemDto } from './dto/update-tienda-item.dto';

@Injectable()
export class TiendaItemService {
  create(createTiendaItemDto: CreateTiendaItemDto) {
    return 'This action adds a new tiendaItem';
  }

  findAll() {
    return `This action returns all tiendaItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiendaItem`;
  }

  update(id: number, updateTiendaItemDto: UpdateTiendaItemDto) {
    return `This action updates a #${id} tiendaItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiendaItem`;
  }
}
