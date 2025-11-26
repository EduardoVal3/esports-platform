import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoOrigenTransaccionService } from './catalogo-origen-transaccion.service';
import { CreateCatalogoOrigenTransaccionDto } from './dto/create-catalogo-origen-transaccion.dto';
import { UpdateCatalogoOrigenTransaccionDto } from './dto/update-catalogo-origen-transaccion.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-origen-transaccion')
export class CatalogoOrigenTransaccionController {
  constructor(private readonly catalogoOrigenTransaccionService: CatalogoOrigenTransaccionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo origen de transacción (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoOrigenTransaccionDto: CreateCatalogoOrigenTransaccionDto) {
    return this.catalogoOrigenTransaccionService.create(createCatalogoOrigenTransaccionDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los orígenes de transacción' })
  @Get()
  findAll() {
    return this.catalogoOrigenTransaccionService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un origen de transacción por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoOrigenTransaccionService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un origen de transacción (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoOrigenTransaccionDto: UpdateCatalogoOrigenTransaccionDto) {
    return this.catalogoOrigenTransaccionService.update(id, updateCatalogoOrigenTransaccionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un origen de transacción (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoOrigenTransaccionService.remove(id);
  }
}
