import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoRegionDto } from './create-catalogo-region.dto';

export class UpdateCatalogoRegionDto extends PartialType(CreateCatalogoRegionDto) {}
