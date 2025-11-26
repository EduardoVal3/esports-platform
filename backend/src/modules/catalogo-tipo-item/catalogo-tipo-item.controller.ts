import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoTipoItemService } from './catalogo-tipo-item.service';
import { CreateCatalogoTipoItemDto } from './dto/create-catalogo-tipo-item.dto';
import { UpdateCatalogoTipoItemDto } from './dto/update-catalogo-tipo-item.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-tipo-item')
export class CatalogoTipoItemController {
  constructor(private readonly catalogoTipoItemService: CatalogoTipoItemService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo tipo de item (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoTipoItemDto: CreateCatalogoTipoItemDto) {
    return this.catalogoTipoItemService.create(createCatalogoTipoItemDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los tipos de item' })
  @Get()
  findAll() {
    return this.catalogoTipoItemService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un tipo de item por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoTipoItemService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un tipo de item (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoTipoItemDto: UpdateCatalogoTipoItemDto) {
    return this.catalogoTipoItemService.update(id, updateCatalogoTipoItemDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un tipo de item (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoTipoItemService.remove(id);
  }
}
