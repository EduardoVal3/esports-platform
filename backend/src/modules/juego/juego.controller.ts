import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JuegoService } from './juego.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('juegos')
@Controller('juego')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar un nuevo juego (admin)' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createJuegoDto: CreateJuegoDto) {
    return this.juegoService.create(createJuegoDto);
  }

  @Public()
  @ApiOperation({ summary: 'Listar todos los juegos' })
  @Get()
  findAll() {
    return this.juegoService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un juego por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juegoService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un juego (admin)' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJuegoDto: UpdateJuegoDto) {
    return this.juegoService.update(id, updateJuegoDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un juego (admin)' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.juegoService.remove(id);
  }
}
