import { Injectable } from '@nestjs/common';
import { CreateCatalogoPlataformaDto } from './dto/create-catalogo-plataforma.dto';
import { UpdateCatalogoPlataformaDto } from './dto/update-catalogo-plataforma.dto';

@Injectable()
export class CatalogoPlataformaService {
  create(createCatalogoPlataformaDto: CreateCatalogoPlataformaDto) {
    return 'This action adds a new catalogoPlataforma';
  }

  findAll() {
    return `This action returns all catalogoPlataforma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoPlataforma`;
  }

  update(id: number, updateCatalogoPlataformaDto: UpdateCatalogoPlataformaDto) {
    return `This action updates a #${id} catalogoPlataforma`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoPlataforma`;
  }
}
