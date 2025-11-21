import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Persona } from '../persona/entities/persona.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el email ya existe
    const existingPersona = await this.personaRepository.findOne({
      where: { correo: registerDto.correo },
    });
    if (existingPersona) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Verificar si el nickname ya existe
    const existingNickname = await this.usuarioRepository.findOne({
      where: { nickname: registerDto.nickname },
    });
    if (existingNickname) {
      throw new ConflictException('El nickname ya está en uso');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear persona
    const persona = this.personaRepository.create({
      nombre: registerDto.nombre,
      apellido: registerDto.apellido,
      correo: registerDto.correo,
      fechaNacimiento: registerDto.fechaNacimiento,
      genero: registerDto.genero,
      timezone: registerDto.timezone || 'UTC',
    });

    // Crear usuario con persona
    const usuario = this.usuarioRepository.create({
      persona,
      nickname: registerDto.nickname,
      password: hashedPassword,
      rol: 'usuario',
    });

    await this.usuarioRepository.save(usuario);

    // Generar token
    const payload = { sub: usuario.id, nickname: usuario.nickname, rol: usuario.rol };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      usuario: {
        id: usuario.id,
        nickname: usuario.nickname,
        rol: usuario.rol,
        persona: {
          nombre: usuario.persona.nombre,
          apellido: usuario.persona.apellido,
          correo: usuario.persona.correo,
        },
      },
    };
  }

  async login(loginDto: LoginDto) {
    // Buscar por nickname o email
    let usuario: Usuario;

    if (loginDto.login.includes('@')) {
      // Es un email
      const persona = await this.personaRepository.findOne({
        where: { correo: loginDto.login },
        relations: ['usuario'],
      });
      usuario = persona?.usuario;
    } else {
      // Es un nickname
      usuario = await this.usuarioRepository.findOne({
        where: { nickname: loginDto.login },
        relations: ['persona'],
      });
    }

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar estado
    if (usuario.estado === 'baneado') {
      throw new UnauthorizedException('Tu cuenta ha sido baneada');
    }
    if (usuario.estado === 'suspendido') {
      throw new UnauthorizedException('Tu cuenta está suspendida');
    }

    // Verificar password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      usuario.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar última conexión
    usuario.ultimaConexion = new Date();
    await this.usuarioRepository.save(usuario);

    // Generar token
    const payload = { sub: usuario.id, nickname: usuario.nickname, rol: usuario.rol };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      usuario: {
        id: usuario.id,
        nickname: usuario.nickname,
        rol: usuario.rol,
        persona: {
          nombre: usuario.persona.nombre,
          apellido: usuario.persona.apellido,
          correo: usuario.persona.correo,
        },
      },
    };
  }

  async validateUser(userId: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['persona'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return usuario;
  }
}
