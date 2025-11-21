import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioLogroDto } from './create-usuario-logro.dto';

export class UpdateUsuarioLogroDto extends PartialType(CreateUsuarioLogroDto) {}
