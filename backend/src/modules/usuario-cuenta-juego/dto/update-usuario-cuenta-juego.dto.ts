import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioCuentaJuegoDto } from './create-usuario-cuenta-juego.dto';

export class UpdateUsuarioCuentaJuegoDto extends PartialType(CreateUsuarioCuentaJuegoDto) {}
