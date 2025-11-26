import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoPlataformaService } from './catalogo-plataforma.service';
import { CreateCatalogoPlataformaDto } from './dto/create-catalogo-plataforma.dto';
import { UpdateCatalogoPlataformaDto } from './dto/update-catalogo-plataforma.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogos')
@Controller('catalogo-plataforma')
export class CatalogoPlataformaController {
  constructor(private readonly catalogoPlataformaService: CatalogoPlataformaService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva plataforma (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatalogoPlataformaDto: CreateCatalogoPlataformaDto) {
    return this.catalogoPlataformaService.create(createCatalogoPlataformaDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todas las plataformas' })
  @Get()
  findAll() {
    return this.catalogoPlataformaService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una plataforma por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogoPlataformaService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una plataforma (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoPlataformaDto: UpdateCatalogoPlataformaDto) {
    return this.catalogoPlataformaService.update(id, updateCatalogoPlataformaDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una plataforma (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.catalogoPlataformaService.remove(id);
  }
}
