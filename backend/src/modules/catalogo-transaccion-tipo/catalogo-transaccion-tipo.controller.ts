import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoTransaccionTipoService } from './catalogo-transaccion-tipo.service';
import { CreateCatalogoTransaccionTipoDto } from './dto/create-catalogo-transaccion-tipo.dto';
import { UpdateCatalogoTransaccionTipoDto } from './dto/update-catalogo-transaccion-tipo.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-transaccion-tipo')
export class CatalogoTransaccionTipoController {
  constructor(private readonly catalogoTransaccionTipoService: CatalogoTransaccionTipoService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo tipo de transacción (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoTransaccionTipoDto: CreateCatalogoTransaccionTipoDto) {
    return this.catalogoTransaccionTipoService.create(createCatalogoTransaccionTipoDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los tipos de transacción' })
  @Get()
  findAll() {
    return this.catalogoTransaccionTipoService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un tipo de transacción por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoTransaccionTipoService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un tipo de transacción (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoTransaccionTipoDto: UpdateCatalogoTransaccionTipoDto) {
    return this.catalogoTransaccionTipoService.update(id, updateCatalogoTransaccionTipoDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un tipo de transacción (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoTransaccionTipoService.remove(id);
  }
}
