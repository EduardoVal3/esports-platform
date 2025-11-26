import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogoAvatarService } from './catalogo-avatar.service';
import { CreateCatalogoAvatarDto, UpdateCatalogoAvatarDto } from './dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('catalogo-avatar')
@Controller('catalogo-avatar')
export class CatalogoAvatarController {
  constructor(private readonly catalogoAvatarService: CatalogoAvatarService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo avatar (admin)' })
  @Post()
  create(@Body() createCatalogoAvatarDto: CreateCatalogoAvatarDto) {
    return this.catalogoAvatarService.create(createCatalogoAvatarDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar avatares disponibles' })
  @Get()
  findAll() {
    return this.catalogoAvatarService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los avatares (incluyendo premium)' })
  @Get('all-with-premium')
  findAllWithPremium() {
    return this.catalogoAvatarService.findAllWithPremium();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un avatar por ID' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.catalogoAvatarService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Buscar avatar por seed' })
  @Get('seed/:seed')
  findBySeed(@Param('seed') seed: string) {
    return this.catalogoAvatarService.findBySeed(seed);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un avatar (admin)' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCatalogoAvatarDto: UpdateCatalogoAvatarDto,
  ) {
    return this.catalogoAvatarService.update(id, updateCatalogoAvatarDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un avatar (admin)' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.catalogoAvatarService.remove(id);
  }
}
