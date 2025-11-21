import { Injectable } from '@nestjs/common';
import { CreateUsuarioTrofeoDto } from './dto/create-usuario-trofeo.dto';
import { UpdateUsuarioTrofeoDto } from './dto/update-usuario-trofeo.dto';

@Injectable()
export class UsuarioTrofeoService {
  create(createUsuarioTrofeoDto: CreateUsuarioTrofeoDto) {
    return 'This action adds a new usuarioTrofeo';
  }

  findAll() {
    return `This action returns all usuarioTrofeo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioTrofeo`;
  }

  update(id: number, updateUsuarioTrofeoDto: UpdateUsuarioTrofeoDto) {
    return `This action updates a #${id} usuarioTrofeo`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioTrofeo`;
  }
}
