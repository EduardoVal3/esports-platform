import { Injectable } from '@nestjs/common';
import { CreateCatalogoRegionDto } from './dto/create-catalogo-region.dto';
import { UpdateCatalogoRegionDto } from './dto/update-catalogo-region.dto';

@Injectable()
export class CatalogoRegionService {
  create(createCatalogoRegionDto: CreateCatalogoRegionDto) {
    return 'This action adds a new catalogoRegion';
  }

  findAll() {
    return `This action returns all catalogoRegion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogoRegion`;
  }

  update(id: number, updateCatalogoRegionDto: UpdateCatalogoRegionDto) {
    return `This action updates a #${id} catalogoRegion`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogoRegion`;
  }
}
