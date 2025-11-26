import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoAvatarDto } from './create-catalogo-avatar.dto';

export class UpdateCatalogoAvatarDto extends PartialType(CreateCatalogoAvatarDto) {}
