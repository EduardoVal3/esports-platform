import { PartialType } from '@nestjs/mapped-types';
import { CreateTorneoPremioDto } from './create-torneo-premio.dto';

export class UpdateTorneoPremioDto extends PartialType(CreateTorneoPremioDto) {}
