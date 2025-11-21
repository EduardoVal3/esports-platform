import { Injectable } from '@nestjs/common';
import { CreateUsuarioLogroDto } from './dto/create-usuario-logro.dto';
import { UpdateUsuarioLogroDto } from './dto/update-usuario-logro.dto';

@Injectable()
export class UsuarioLogroService {
  create(createUsuarioLogroDto: CreateUsuarioLogroDto) {
    return 'This action adds a new usuarioLogro';
  }

  findAll() {
    return `This action returns all usuarioLogro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioLogro`;
  }

  update(id: number, updateUsuarioLogroDto: UpdateUsuarioLogroDto) {
    return `This action updates a #${id} usuarioLogro`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioLogro`;
  }
}
