import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TiendaItemService } from './tienda-item.service';
import { CreateTiendaItemDto } from './dto/create-tienda-item.dto';
import { UpdateTiendaItemDto } from './dto/update-tienda-item.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('tienda')
@Controller('tienda-item')
export class TiendaItemController {
  constructor(private readonly tiendaItemService: TiendaItemService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un item de tienda (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTiendaItemDto: CreateTiendaItemDto) {
    return this.tiendaItemService.create(createTiendaItemDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los items de la tienda' })
  @Get()
  findAll() {
    return this.tiendaItemService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un item de tienda por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiendaItemService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un item de tienda (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiendaItemDto: UpdateTiendaItemDto) {
    return this.tiendaItemService.update(id, updateTiendaItemDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un item de tienda (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tiendaItemService.remove(id);
  }
}
