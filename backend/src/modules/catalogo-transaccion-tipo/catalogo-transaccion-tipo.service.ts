import { Injectable } from '@nestjs/common';
import { CreateCatalogoTransaccionTipoDto } from './dto/create-catalogo-transaccion-tipo.dto';
import { UpdateCatalogoTransaccionTipoDto } from './dto/update-catalogo-transaccion-tipo.dto';

@Injectable()
export class CatalogoTransaccionTipoService {
  create(createCatalogoTransaccionTipoDto: CreateCatalogoTransaccionTipoDto) {
    return 'This action adds a new catalogoTransaccionTipo';
  }

  findAll() {
    return `This action returns all catalogoTransaccionTipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoTransaccionTipo`;
  }

  update(id: number, updateCatalogoTransaccionTipoDto: UpdateCatalogoTransaccionTipoDto) {
    return `This action updates a #${id} catalogoTransaccionTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoTransaccionTipo`;
  }
}
