import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoRegionService } from './catalogo-region.service';
import { CreateCatalogoRegionDto } from './dto/create-catalogo-region.dto';
import { UpdateCatalogoRegionDto } from './dto/update-catalogo-region.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-region')
export class CatalogoRegionController {
  constructor(private readonly catalogoRegionService: CatalogoRegionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva región (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoRegionDto: CreateCatalogoRegionDto) {
    return this.catalogoRegionService.create(createCatalogoRegionDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todas las regiones' })
  @Get()
  findAll() {
    return this.catalogoRegionService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una región por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoRegionService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una región (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoRegionDto: UpdateCatalogoRegionDto) {
    return this.catalogoRegionService.update(id, updateCatalogoRegionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una región (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoRegionService.remove(id);
  }
}
