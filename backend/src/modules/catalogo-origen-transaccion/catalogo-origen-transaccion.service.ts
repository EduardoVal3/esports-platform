import { Injectable } from '@nestjs/common';
import { CreateCatalogoOrigenTransaccionDto } from './dto/create-catalogo-origen-transaccion.dto';
import { UpdateCatalogoOrigenTransaccionDto } from './dto/update-catalogo-origen-transaccion.dto';

@Injectable()
export class CatalogoOrigenTransaccionService {
  create(createCatalogoOrigenTransaccionDto: CreateCatalogoOrigenTransaccionDto) {
    return 'This action adds a new catalogoOrigenTransaccion';
  }

  findAll() {
    return `This action returns all catalogoOrigenTransaccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoOrigenTransaccion`;
  }

  update(id: number, updateCatalogoOrigenTransaccionDto: UpdateCatalogoOrigenTransaccionDto) {
    return `This action updates a #${id} catalogoOrigenTransaccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoOrigenTransaccion`;
  }
}
