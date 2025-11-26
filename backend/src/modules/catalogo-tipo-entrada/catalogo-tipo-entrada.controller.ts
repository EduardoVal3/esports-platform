import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoTipoEntradaService } from './catalogo-tipo-entrada.service';
import { CreateCatalogoTipoEntradaDto } from './dto/create-catalogo-tipo-entrada.dto';
import { UpdateCatalogoTipoEntradaDto } from './dto/update-catalogo-tipo-entrada.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-tipo-entrada')
export class CatalogoTipoEntradaController {
  constructor(private readonly catalogoTipoEntradaService: CatalogoTipoEntradaService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo tipo de entrada (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoTipoEntradaDto: CreateCatalogoTipoEntradaDto) {
    return this.catalogoTipoEntradaService.create(createCatalogoTipoEntradaDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los tipos de entrada' })
  @Get()
  findAll() {
    return this.catalogoTipoEntradaService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un tipo de entrada por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoTipoEntradaService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un tipo de entrada (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoTipoEntradaDto: UpdateCatalogoTipoEntradaDto) {
    return this.catalogoTipoEntradaService.update(id, updateCatalogoTipoEntradaDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un tipo de entrada (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoTipoEntradaService.remove(id);
  }
}
