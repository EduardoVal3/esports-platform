import { Injectable } from '@nestjs/common';
import { CreateUsuarioRedSocialDto } from './dto/create-usuario-red-social.dto';
import { UpdateUsuarioRedSocialDto } from './dto/update-usuario-red-social.dto';

@Injectable()
export class UsuarioRedSocialService {
  create(createUsuarioRedSocialDto: CreateUsuarioRedSocialDto) {
    return 'This action adds a new usuarioRedSocial';
  }

  findAll() {
    return `This action returns all usuarioRedSocial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioRedSocial`;
  }

  update(id: number, updateUsuarioRedSocialDto: UpdateUsuarioRedSocialDto) {
    return `This action updates a #${id} usuarioRedSocial`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioRedSocial`;
  }
}
