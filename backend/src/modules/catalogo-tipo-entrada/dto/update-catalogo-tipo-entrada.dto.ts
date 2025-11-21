import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoTipoEntradaDto } from './create-catalogo-tipo-entrada.dto';

export class UpdateCatalogoTipoEntradaDto extends PartialType(CreateCatalogoTipoEntradaDto) {}
