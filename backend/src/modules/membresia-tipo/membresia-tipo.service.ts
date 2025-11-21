import { Injectable } from '@nestjs/common';
import { CreateMembresiaTipoDto } from './dto/create-membresia-tipo.dto';
import { UpdateMembresiaTipoDto } from './dto/update-membresia-tipo.dto';

@Injectable()
export class MembresiaTipoService {
  create(createMembresiaTipoDto: CreateMembresiaTipoDto) {
    return 'This action adds a new membresiaTipo';
  }

  findAll() {
    return `This action returns all membresiaTipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} membresiaTipo`;
  }

  update(id: number, updateMembresiaTipoDto: UpdateMembresiaTipoDto) {
    return `This action updates a #${id} membresiaTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} membresiaTipo`;
  }
}
