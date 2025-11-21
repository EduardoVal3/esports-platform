import { Injectable } from '@nestjs/common';
import { CreateTorneoPremioDto } from './dto/create-torneo-premio.dto';
import { UpdateTorneoPremioDto } from './dto/update-torneo-premio.dto';

@Injectable()
export class TorneoPremioService {
  create(createTorneoPremioDto: CreateTorneoPremioDto) {
    return 'This action adds a new torneoPremio';
  }

  findAll() {
    return `This action returns all torneoPremio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} torneoPremio`;
  }

  update(id: number, updateTorneoPremioDto: UpdateTorneoPremioDto) {
    return `This action updates a #${id} torneoPremio`;
  }

  remove(id: number) {
    return `This action removes a #${id} torneoPremio`;
  }
}
