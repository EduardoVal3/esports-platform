import { Injectable } from '@nestjs/common';
import { CreateEquipoMiembroDto } from './dto/create-equipo-miembro.dto';
import { UpdateEquipoMiembroDto } from './dto/update-equipo-miembro.dto';

@Injectable()
export class EquipoMiembroService {
  create(createEquipoMiembroDto: CreateEquipoMiembroDto) {
    return 'This action adds a new equipoMiembro';
  }

  findAll() {
    return `This action returns all equipoMiembro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoMiembro`;
  }

  update(id: number, updateEquipoMiembroDto: UpdateEquipoMiembroDto) {
    return `This action updates a #${id} equipoMiembro`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoMiembro`;
  }
}
