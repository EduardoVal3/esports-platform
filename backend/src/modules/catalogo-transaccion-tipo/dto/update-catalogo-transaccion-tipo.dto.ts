import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoTransaccionTipoDto } from './create-catalogo-transaccion-tipo.dto';

export class UpdateCatalogoTransaccionTipoDto extends PartialType(CreateCatalogoTransaccionTipoDto) {}
