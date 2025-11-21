import { Injectable } from '@nestjs/common';
import { CreateUsuarioMembresiaDto } from './dto/create-usuario-membresia.dto';
import { UpdateUsuarioMembresiaDto } from './dto/update-usuario-membresia.dto';

@Injectable()
export class UsuarioMembresiaService {
  create(createUsuarioMembresiaDto: CreateUsuarioMembresiaDto) {
    return 'This action adds a new usuarioMembresia';
  }

  findAll() {
    return `This action returns all usuarioMembresia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioMembresia`;
  }

  update(id: number, updateUsuarioMembresiaDto: UpdateUsuarioMembresiaDto) {
    return `This action updates a #${id} usuarioMembresia`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioMembresia`;
  }
}
