import { Injectable } from '@nestjs/common';
import { CreateUsuarioSeguidoreDto } from './dto/create-usuario-seguidore.dto';
import { UpdateUsuarioSeguidoreDto } from './dto/update-usuario-seguidore.dto';

@Injectable()
export class UsuarioSeguidoresService {
  create(createUsuarioSeguidoreDto: CreateUsuarioSeguidoreDto) {
    return 'This action adds a new usuarioSeguidore';
  }

  findAll() {
    return `This action returns all usuarioSeguidores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioSeguidore`;
  }

  update(id: number, updateUsuarioSeguidoreDto: UpdateUsuarioSeguidoreDto) {
    return `This action updates a #${id} usuarioSeguidore`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioSeguidore`;
  }
}
