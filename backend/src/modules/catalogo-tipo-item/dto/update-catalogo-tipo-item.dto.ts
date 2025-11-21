import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoTipoItemDto } from './create-catalogo-tipo-item.dto';

export class UpdateCatalogoTipoItemDto extends PartialType(CreateCatalogoTipoItemDto) {}
