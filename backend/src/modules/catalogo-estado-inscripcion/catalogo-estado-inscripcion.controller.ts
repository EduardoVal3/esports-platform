import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoEstadoInscripcionService } from './catalogo-estado-inscripcion.service';
import { CreateCatalogoEstadoInscripcionDto } from './dto/create-catalogo-estado-inscripcion.dto';
import { UpdateCatalogoEstadoInscripcionDto } from './dto/update-catalogo-estado-inscripcion.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-estado-inscripcion')
export class CatalogoEstadoInscripcionController {
  constructor(private readonly catalogoEstadoInscripcionService: CatalogoEstadoInscripcionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo estado de inscripción (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoEstadoInscripcionDto: CreateCatalogoEstadoInscripcionDto) {
    return this.catalogoEstadoInscripcionService.create(createCatalogoEstadoInscripcionDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los estados de inscripción' })
  @Get()
  findAll() {
    return this.catalogoEstadoInscripcionService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un estado de inscripción por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoEstadoInscripcionService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un estado de inscripción (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoEstadoInscripcionDto: UpdateCatalogoEstadoInscripcionDto) {
    return this.catalogoEstadoInscripcionService.update(id, updateCatalogoEstadoInscripcionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un estado de inscripción (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoEstadoInscripcionService.remove(id);
  }
}
