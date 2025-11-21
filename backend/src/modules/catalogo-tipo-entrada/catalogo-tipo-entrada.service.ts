import { Injectable } from '@nestjs/common';
import { CreateCatalogoTipoEntradaDto } from './dto/create-catalogo-tipo-entrada.dto';
import { UpdateCatalogoTipoEntradaDto } from './dto/update-catalogo-tipo-entrada.dto';

@Injectable()
export class CatalogoTipoEntradaService {
  create(createCatalogoTipoEntradaDto: CreateCatalogoTipoEntradaDto) {
    return 'This action adds a new catalogoTipoEntrada';
  }

  findAll() {
    return `This action returns all catalogoTipoEntrada`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoTipoEntrada`;
  }

  update(id: number, updateCatalogoTipoEntradaDto: UpdateCatalogoTipoEntradaDto) {
    return `This action updates a #${id} catalogoTipoEntrada`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoTipoEntrada`;
  }
}
