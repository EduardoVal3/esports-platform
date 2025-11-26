import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoEstadoAmistadService } from './catalogo-estado-amistad.service';
import { CreateCatalogoEstadoAmistadDto } from './dto/create-catalogo-estado-amistad.dto';
import { UpdateCatalogoEstadoAmistadDto } from './dto/update-catalogo-estado-amistad.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-estado-amistad')
export class CatalogoEstadoAmistadController {
  constructor(private readonly catalogoEstadoAmistadService: CatalogoEstadoAmistadService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo estado de amistad (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoEstadoAmistadDto: CreateCatalogoEstadoAmistadDto) {
    return this.catalogoEstadoAmistadService.create(createCatalogoEstadoAmistadDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los estados de amistad' })
  @Get()
  findAll() {
    return this.catalogoEstadoAmistadService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un estado de amistad por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoEstadoAmistadService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un estado de amistad (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoEstadoAmistadDto: UpdateCatalogoEstadoAmistadDto) {
    return this.catalogoEstadoAmistadService.update(id, updateCatalogoEstadoAmistadDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un estado de amistad (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoEstadoAmistadService.remove(id);
  }
}
