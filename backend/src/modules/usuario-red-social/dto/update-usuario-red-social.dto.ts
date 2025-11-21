import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioRedSocialDto } from './create-usuario-red-social.dto';

export class UpdateUsuarioRedSocialDto extends PartialType(CreateUsuarioRedSocialDto) {}
