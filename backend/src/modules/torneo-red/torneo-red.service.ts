import { Injectable } from '@nestjs/common';
import { CreateTorneoRedDto } from './dto/create-torneo-red.dto';
import { UpdateTorneoRedDto } from './dto/update-torneo-red.dto';

@Injectable()
export class TorneoRedService {
  create(createTorneoRedDto: CreateTorneoRedDto) {
    return 'This action adds a new torneoRed';
  }

  findAll() {
    return `This action returns all torneoRed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} torneoRed`;
  }

  update(id: number, updateTorneoRedDto: UpdateTorneoRedDto) {
    return `This action updates a #${id} torneoRed`;
  }

  remove(id: number) {
    return `This action removes a #${id} torneoRed`;
  }
}
