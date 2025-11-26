import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoGeneroService } from './catalogo-genero.service';
import { CreateCatalogoGeneroDto } from './dto/create-catalogo-genero.dto';
import { UpdateCatalogoGeneroDto } from './dto/update-catalogo-genero.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-genero')
export class CatalogoGeneroController {
  constructor(private readonly catalogoGeneroService: CatalogoGeneroService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo género (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoGeneroDto: CreateCatalogoGeneroDto) {
    return this.catalogoGeneroService.create(createCatalogoGeneroDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los géneros' })
  @Get()
  findAll() {
    return this.catalogoGeneroService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un género por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoGeneroService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un género (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoGeneroDto: UpdateCatalogoGeneroDto) {
    return this.catalogoGeneroService.update(id, updateCatalogoGeneroDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un género (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoGeneroService.remove(id);
  }
}
