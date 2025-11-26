import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MembresiaTipoService } from './membresia-tipo.service';
import { CreateMembresiaTipoDto } from './dto/create-membresia-tipo.dto';
import { UpdateMembresiaTipoDto } from './dto/update-membresia-tipo.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('tienda')
@Controller('membresia-tipo')
export class MembresiaTipoController {
  constructor(private readonly membresiaTipoService: MembresiaTipoService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un tipo de membresía (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMembresiaTipoDto: CreateMembresiaTipoDto) {
    return this.membresiaTipoService.create(createMembresiaTipoDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los tipos de membresía' })
  @Get()
  findAll() {
    return this.membresiaTipoService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un tipo de membresía por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membresiaTipoService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un tipo de membresía (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembresiaTipoDto: UpdateMembresiaTipoDto) {
    return this.membresiaTipoService.update(id, updateMembresiaTipoDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un tipo de membresía (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.membresiaTipoService.remove(id);
  }
}
