import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoEstadoTorneoService } from './catalogo-estado-torneo.service';
import { CreateCatalogoEstadoTorneoDto } from './dto/create-catalogo-estado-torneo.dto';
import { UpdateCatalogoEstadoTorneoDto } from './dto/update-catalogo-estado-torneo.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-estado-torneo')
export class CatalogoEstadoTorneoController {
  constructor(private readonly catalogoEstadoTorneoService: CatalogoEstadoTorneoService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo estado de torneo (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoEstadoTorneoDto: CreateCatalogoEstadoTorneoDto) {
    return this.catalogoEstadoTorneoService.create(createCatalogoEstadoTorneoDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los estados de torneo' })
  @Get()
  findAll() {
    return this.catalogoEstadoTorneoService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un estado de torneo por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoEstadoTorneoService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un estado de torneo (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoEstadoTorneoDto: UpdateCatalogoEstadoTorneoDto) {
    return this.catalogoEstadoTorneoService.update(id, updateCatalogoEstadoTorneoDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un estado de torneo (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoEstadoTorneoService.remove(id);
  }
}
