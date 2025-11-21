import { PartialType } from '@nestjs/mapped-types';
import { CreateModoJuegoDto } from './create-modo-juego.dto';

export class UpdateModoJuegoDto extends PartialType(CreateModoJuegoDto) {}
