import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoOrigenTransaccionDto } from './create-catalogo-origen-transaccion.dto';

export class UpdateCatalogoOrigenTransaccionDto extends PartialType(CreateCatalogoOrigenTransaccionDto) {}
