import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioTrofeoDto } from './create-usuario-trofeo.dto';

export class UpdateUsuarioTrofeoDto extends PartialType(CreateUsuarioTrofeoDto) {}
