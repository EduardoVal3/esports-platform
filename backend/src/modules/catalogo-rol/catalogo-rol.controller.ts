import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoRolService } from './catalogo-rol.service';
import { CreateCatalogoRolDto } from './dto/create-catalogo-rol.dto';
import { UpdateCatalogoRolDto } from './dto/update-catalogo-rol.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-rol')
export class CatalogoRolController {
  constructor(private readonly catalogoRolService: CatalogoRolService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo rol (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoRolDto: CreateCatalogoRolDto) {
    return this.catalogoRolService.create(createCatalogoRolDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los roles' })
  @Get()
  findAll() {
    return this.catalogoRolService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoRolService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un rol (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoRolDto: UpdateCatalogoRolDto) {
    return this.catalogoRolService.update(id, updateCatalogoRolDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un rol (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoRolService.remove(id);
  }
}
