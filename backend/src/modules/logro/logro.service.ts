import { Injectable } from '@nestjs/common';
import { CreateLogroDto } from './dto/create-logro.dto';
import { UpdateLogroDto } from './dto/update-logro.dto';

@Injectable()
export class LogroService {
  create(createLogroDto: CreateLogroDto) {
    return 'This action adds a new logro';
  }

  findAll() {
    return `This action returns all logro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logro`;
  }

  update(id: number, updateLogroDto: UpdateLogroDto) {
    return `This action updates a #${id} logro`;
  }

  remove(id: number) {
    return `This action removes a #${id} logro`;
  }
}
