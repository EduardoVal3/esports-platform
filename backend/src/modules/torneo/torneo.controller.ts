import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TorneoService } from './torneo.service';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('torneos')
@Controller('torneo')
export class TorneoController {
  constructor(private readonly torneoService: TorneoService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo torneo (requiere autenticación)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTorneoDto: CreateTorneoDto) {
    return this.torneoService.create(createTorneoDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los torneos' })
  @Get()
  findAll() {
    return this.torneoService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un torneo por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.torneoService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un torneo (creador o admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTorneoDto: UpdateTorneoDto) {
    return this.torneoService.update(id, updateTorneoDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un torneo (creador o admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.torneoService.remove(id);
  }
}
