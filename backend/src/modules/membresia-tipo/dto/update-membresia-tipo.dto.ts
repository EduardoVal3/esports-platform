import { PartialType } from '@nestjs/mapped-types';
import { CreateMembresiaTipoDto } from './create-membresia-tipo.dto';

export class UpdateMembresiaTipoDto extends PartialType(CreateMembresiaTipoDto) {}
