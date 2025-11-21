import { PartialType } from '@nestjs/mapped-types';
import { CreateTorneoRedDto } from './create-torneo-red.dto';

export class UpdateTorneoRedDto extends PartialType(CreateTorneoRedDto) {}
