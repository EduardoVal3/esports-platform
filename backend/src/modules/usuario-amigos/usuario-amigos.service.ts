import { Injectable } from '@nestjs/common';
import { CreateUsuarioAmigoDto } from './dto/create-usuario-amigo.dto';
import { UpdateUsuarioAmigoDto } from './dto/update-usuario-amigo.dto';

@Injectable()
export class UsuarioAmigosService {
  create(createUsuarioAmigoDto: CreateUsuarioAmigoDto) {
    return 'This action adds a new usuarioAmigo';
  }

  findAll() {
    return `This action returns all usuarioAmigos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioAmigo`;
  }

  update(id: number, updateUsuarioAmigoDto: UpdateUsuarioAmigoDto) {
    return `This action updates a #${id} usuarioAmigo`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioAmigo`;
  }
}
