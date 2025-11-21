import { PartialType } from '@nestjs/mapped-types';
import { CreateTiendaItemDto } from './create-tienda-item.dto';

export class UpdateTiendaItemDto extends PartialType(CreateTiendaItemDto) {}
