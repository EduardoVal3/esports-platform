import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CatalogoRol } from '../../modules/catalogo-rol/entities/catalogo-rol.entity';
import { CatalogoGenero } from '../../modules/catalogo-genero/entities/catalogo-genero.entity';
import { CatalogoEstadoAmistad } from '../../modules/catalogo-estado-amistad/entities/catalogo-estado-amistad.entity';
import { CatalogoEstadoInscripcion } from '../../modules/catalogo-estado-inscripcion/entities/catalogo-estado-inscripcion.entity';
import { CatalogoEstadoTorneo } from '../../modules/catalogo-estado-torneo/entities/catalogo-estado-torneo.entity';
import { CatalogoOrigenTransaccion } from '../../modules/catalogo-origen-transaccion/entities/catalogo-origen-transaccion.entity';
import { CatalogoPlataforma } from '../../modules/catalogo-plataforma/entities/catalogo-plataforma.entity';
import { CatalogoRegion } from '../../modules/catalogo-region/entities/catalogo-region.entity';
import { CatalogoTipoEntrada } from '../../modules/catalogo-tipo-entrada/entities/catalogo-tipo-entrada.entity';
import { CatalogoTipoItem } from '../../modules/catalogo-tipo-item/entities/catalogo-tipo-item.entity';
import { CatalogoTransaccionTipo } from '../../modules/catalogo-transaccion-tipo/entities/catalogo-transaccion-tipo.entity';
import { CatalogoAvatar } from '../../modules/catalogo-avatar/entities/catalogo-avatar.entity';
import { MembresiaTipo } from '../../modules/membresia-tipo/entities/membresia-tipo.entity';
import { TiendaItem } from '../../modules/tienda-item/entities/tienda-item.entity';
import { Persona } from '../../modules/persona/entities/persona.entity';
import { Usuario } from '../../modules/usuario/entities/usuario.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(CatalogoRol)
    private readonly rolRepository: Repository<CatalogoRol>,
    @InjectRepository(CatalogoGenero)
    private readonly generoRepository: Repository<CatalogoGenero>,
    @InjectRepository(CatalogoEstadoAmistad)
    private readonly estadoAmistadRepository: Repository<CatalogoEstadoAmistad>,
    @InjectRepository(CatalogoEstadoInscripcion)
    private readonly estadoInscripcionRepository: Repository<CatalogoEstadoInscripcion>,
    @InjectRepository(CatalogoEstadoTorneo)
    private readonly estadoTorneoRepository: Repository<CatalogoEstadoTorneo>,
    @InjectRepository(CatalogoOrigenTransaccion)
    private readonly origenTransaccionRepository: Repository<CatalogoOrigenTransaccion>,
    @InjectRepository(CatalogoPlataforma)
    private readonly plataformaRepository: Repository<CatalogoPlataforma>,
    @InjectRepository(CatalogoRegion)
    private readonly regionRepository: Repository<CatalogoRegion>,
    @InjectRepository(CatalogoTipoEntrada)
    private readonly tipoEntradaRepository: Repository<CatalogoTipoEntrada>,
    @InjectRepository(CatalogoTipoItem)
    private readonly tipoItemRepository: Repository<CatalogoTipoItem>,
    @InjectRepository(CatalogoTransaccionTipo)
    private readonly transaccionTipoRepository: Repository<CatalogoTransaccionTipo>,
    @InjectRepository(CatalogoAvatar)
    private readonly avatarRepository: Repository<CatalogoAvatar>,
    @InjectRepository(MembresiaTipo)
    private readonly membresiaTipoRepository: Repository<MembresiaTipo>,
    @InjectRepository(TiendaItem)
    private readonly tiendaItemRepository: Repository<TiendaItem>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async seed() {
    console.log('🌱 Verificando seeds...');

    // Verificar si ya se ejecutaron los seeds anteriormente
    const adminExists = await this.usuarioRepository.findOne({
      where: { nickname: 'admin' },
    });

    const rolesExist = await this.rolRepository.count();

    if (adminExists && rolesExist > 0) {
      console.log('⏭️  Seeds ya ejecutados previamente. Saltando...');
      console.log('💡 Para forzar la re-ejecución, elimina el usuario admin de la base de datos.');
      return;
    }

    console.log('🌱 Iniciando seeds...');

    await this.seedRoles();
    await this.seedGeneros();
    await this.seedEstadosAmistad();
    await this.seedEstadosInscripcion();
    await this.seedEstadosTorneo();
    await this.seedOrigenesTransaccion();
    await this.seedPlataformas();
    await this.seedRegiones();
    await this.seedTiposEntrada();
    await this.seedTiposItem();
    await this.seedTiposTransaccion();
    await this.seedAvatares();
    await this.seedMembresias();
    await this.seedTiendaItems();
    await this.seedAdminUser();

    console.log('✅ Seeds completados exitosamente!');
  }

  private async seedRoles() {
    const roles = ['admin', 'usuario', 'moderador'];
    
    for (const valor of roles) {
      const exists = await this.rolRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.rolRepository.save({ valor });
        console.log(`  ✓ Rol creado: ${valor}`);
      }
    }
  }

  private async seedGeneros() {
    const generos = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'];
    
    for (const valor of generos) {
      const exists = await this.generoRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.generoRepository.save({ valor });
        console.log(`  ✓ Género creado: ${valor}`);
      }
    }
  }

  private async seedEstadosAmistad() {
    const estados = ['pendiente', 'aceptada', 'rechazada', 'bloqueada'];
    
    for (const valor of estados) {
      const exists = await this.estadoAmistadRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.estadoAmistadRepository.save({ valor });
        console.log(`  ✓ Estado de amistad creado: ${valor}`);
      }
    }
  }

  private async seedEstadosInscripcion() {
    const estados = ['pendiente', 'confirmada', 'cancelada', 'rechazada'];
    
    for (const valor of estados) {
      const exists = await this.estadoInscripcionRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.estadoInscripcionRepository.save({ valor });
        console.log(`  ✓ Estado de inscripción creado: ${valor}`);
      }
    }
  }

  private async seedEstadosTorneo() {
    const estados = ['borrador', 'abierto', 'en curso', 'finalizado', 'cancelado'];
    
    for (const valor of estados) {
      const exists = await this.estadoTorneoRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.estadoTorneoRepository.save({ valor });
        console.log(`  ✓ Estado de torneo creado: ${valor}`);
      }
    }
  }

  private async seedOrigenesTransaccion() {
    const origenes = ['compra', 'premio', 'reembolso', 'regalo', 'logro', 'torneo'];
    
    for (const valor of origenes) {
      const exists = await this.origenTransaccionRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.origenTransaccionRepository.save({ valor });
        console.log(`  ✓ Origen de transacción creado: ${valor}`);
      }
    }
  }

  private async seedPlataformas() {
    const plataformas = [
      'PC',
      'PlayStation 5',
      'PlayStation 4',
      'Xbox Series X/S',
      'Xbox One',
      'Nintendo Switch',
      'Mobile',
      'Steam',
      'Epic Games',
      'Battle.net',
    ];
    
    for (const valor of plataformas) {
      const exists = await this.plataformaRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.plataformaRepository.save({ valor });
        console.log(`  ✓ Plataforma creada: ${valor}`);
      }
    }
  }

  private async seedRegiones() {
    const regiones = [
      'Norte América',
      'Sur América',
      'Europa',
      'Asia',
      'Oceanía',
      'África',
      'LATAM',
      'Brasil',
      'Global',
    ];
    
    for (const valor of regiones) {
      const exists = await this.regionRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.regionRepository.save({ valor });
        console.log(`  ✓ Región creada: ${valor}`);
      }
    }
  }

  private async seedTiposEntrada() {
    const tipos = ['mando', 'teclado', 'todos'];
    
    for (const valor of tipos) {
      const exists = await this.tipoEntradaRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.tipoEntradaRepository.save({ valor });
        console.log(`  ✓ Tipo de entrada creado: ${valor}`);
      }
    }
  }

  private async seedTiposItem() {
    const tipos = ['creditos', 'membresia', 'servicio'];
    
    for (const valor of tipos) {
      const exists = await this.tipoItemRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.tipoItemRepository.save({ valor });
        console.log(`  ✓ Tipo de item creado: ${valor}`);
      }
    }
  }

  private async seedTiposTransaccion() {
    const tipos = ['saldo', 'creditos'];
    
    for (const valor of tipos) {
      const exists = await this.transaccionTipoRepository.findOne({ where: { valor } });
      if (!exists) {
        await this.transaccionTipoRepository.save({ valor });
        console.log(`  ✓ Tipo de transacción creado: ${valor}`);
      }
    }
  }

  private async seedAvatares() {
    // Seeds para avatares bottts
    const botttSeeds = [
      'Felix', 'Aneka', 'Buster', 'Midnight', 'Precious', 'Shadow', 
      'Lucky', 'Misty', 'Buddy', 'Charlie', 'Max', 'Luna', 'Rocky',
      'Daisy', 'Bailey', 'Coco', 'Milo', 'Bella', 'Oliver', 'Zoe',
      'Leo', 'Lily', 'Cooper', 'Lucy', 'Bear', 'Molly', 'Duke', 'Sophie',
      'Zeus', 'Sadie', 'Jack', 'Maggie', 'Toby', 'Stella', 'Teddy',
      'Penny', 'Winston', 'Chloe', 'Tucker', 'Lola', 'Jake', 'Nala',
      'Bentley', 'Gracie', 'Oscar', 'Ruby', 'Gizmo', 'Rosie', 'Thor',
      'Ellie', 'Bandit', 'Zoey', 'Finn', 'Ginger', 'Harley', 'Princess',
      'Murphy', 'Piper', 'Riley', 'Willow', 'Hank', 'Emma', 'Louie',
      'Abby', 'Bruno', 'Angel', 'Diesel', 'Annie', 'Ace', 'Roxy'
    ];

    let createdCount = 0;
    let existingCount = 0;

    for (let index = 0; index < botttSeeds.length; index++) {
      const seed = botttSeeds[index];
      const nombre = `bottts-${seed.toLowerCase()}`;
      
      const exists = await this.avatarRepository.findOne({ where: { nombre } });
      
      if (!exists) {
        await this.avatarRepository.save({
          nombre,
          url: `https://api.dicebear.com/9.x/bottts/svg?seed=${seed}`,
          seed,
          categoria: 'bottts',
          disponible: true,
          premium: index >= 50, // Los primeros 50 son gratuitos, el resto premium
        });
        createdCount++;
      } else {
        existingCount++;
      }
    }

    if (createdCount > 0) {
      console.log(`  ✓ Avatares creados: ${createdCount} (${botttSeeds.length - createdCount} ya existían)`);
    } else {
      console.log(`  ⚠ Todos los avatares ya existían (${existingCount})`);
    }
  }

  private async seedMembresias() {
    const membresias = [
      {
        nombre: 'Gratuita',
        precio: '0.00',
        duracionDias: 0,
        beneficios: 'Acceso a competiciones gratuitas, Desafía a otros jugadores a apostar partidos, Desafía a otros jugadores a partidas de XP, Benefíciese de premios con pago instantáneo'
      },
      {
        nombre: 'Premium 1 Mes',
        precio: '5.99',
        duracionDias: 30,
        beneficios: 'Todo lo de la membresía gratuita + Apuestas sin comisiones, Entrada gratuita a los torneos ELITE, Avatares premium, Personalización de la página del equipo, Personalización de la página de perfil'
      },
      {
        nombre: 'Premium 3 Meses',
        precio: '12.99',
        duracionDias: 90,
        beneficios: 'Todo lo de Premium + Ahorra un 28%'
      },
      {
        nombre: 'Premium 6 Meses',
        precio: '24.99',
        duracionDias: 180,
        beneficios: 'Todo lo de Premium + Ahorra un 30%'
      },
      {
        nombre: 'Premium 12 Meses',
        precio: '49.99',
        duracionDias: 365,
        beneficios: 'Todo lo de Premium + Ahorra un 30%'
      }
    ];

    let createdCount = 0;

    for (const membresia of membresias) {
      const exists = await this.membresiaTipoRepository.findOne({ 
        where: { nombre: membresia.nombre } 
      });

      if (!exists) {
        await this.membresiaTipoRepository.save(membresia);
        createdCount++;
      }
    }

    if (createdCount > 0) {
      console.log(`  ✓ Tipos de membresía creados: ${createdCount} (${membresias.length - createdCount} ya existían)`);
    } else {
      console.log(`  ⚠ Todos los tipos de membresía ya existían`);
    }
  }

  private async seedTiendaItems() {
    // Obtener tipos de item
    const tipoCreditosEntity = await this.tipoItemRepository.findOne({ where: { valor: 'creditos' } });
    const tipoMembresiaEntity = await this.tipoItemRepository.findOne({ where: { valor: 'membresia' } });
    const tipoServicioEntity = await this.tipoItemRepository.findOne({ where: { valor: 'servicio' } });
    const membresiasEntity = await this.membresiaTipoRepository.find();

    if (!tipoCreditosEntity || !tipoMembresiaEntity || !tipoServicioEntity) {
      console.log('  ⚠ No se encontraron los tipos de item necesarios');
      return;
    }

    const items: Array<{
      tipo: CatalogoTipoItem;
      nombre: string;
      descripcion: string;
      precio: string;
      creditosOtorgados: number | null;
      metadata: any;
    }> = [
      // Paquetes de créditos
      {
        tipo: tipoCreditosEntity,
        nombre: '1 Crédito',
        descripcion: 'Paquete básico de créditos',
        precio: '1.00',
        creditosOtorgados: 1,
        metadata: { destacado: false }
      },
      {
        tipo: tipoCreditosEntity,
        nombre: '3 Créditos',
        descripcion: 'Paquete de 3 créditos',
        precio: '2.25',
        creditosOtorgados: 3,
        metadata: { destacado: false }
      },
      {
        tipo: tipoCreditosEntity,
        nombre: '5 Créditos',
        descripcion: 'Paquete de 5 créditos',
        precio: '3.75',
        creditosOtorgados: 5,
        metadata: { destacado: false }
      },
      {
        tipo: tipoCreditosEntity,
        nombre: '7 Créditos',
        descripcion: 'Paquete de 7 créditos',
        precio: '5.00',
        creditosOtorgados: 7,
        metadata: { destacado: true }
      },
      {
        tipo: tipoCreditosEntity,
        nombre: '10 Créditos',
        descripcion: 'Paquete de 10 créditos',
        precio: '7.50',
        creditosOtorgados: 10,
        metadata: { destacado: false }
      },
      {
        tipo: tipoCreditosEntity,
        nombre: '15 Créditos',
        descripcion: 'Paquete de 15 créditos - Mejor valor',
        precio: '10.00',
        creditosOtorgados: 15,
        metadata: { destacado: true, mejorValor: true }
      },
      // Servicios
      {
        tipo: tipoServicioEntity,
        nombre: 'Cambio de Nickname',
        descripcion: 'Cambia tu nombre de usuario único',
        precio: '3.99',
        creditosOtorgados: null,
        metadata: { servicioTipo: 'cambio_nickname' }
      },
      {
        tipo: tipoServicioEntity,
        nombre: 'Reiniciar Récord de Juego',
        descripcion: 'Reinicia tu historial completo de partidas',
        precio: '5.99',
        creditosOtorgados: null,
        metadata: { servicioTipo: 'reset_record', advertencia: 'Acción irreversible' }
      },
      {
        tipo: tipoServicioEntity,
        nombre: 'Reiniciar Estadísticas',
        descripcion: 'Reinicia tus estadísticas de juego',
        precio: '3.99',
        creditosOtorgados: null,
        metadata: { servicioTipo: 'reset_stats', advertencia: 'Acción irreversible' }
      }
    ];

    // Agregar membresías a items de tienda
    for (const membresia of membresiasEntity) {
      if (membresia.nombre !== 'Gratuita') {
        items.push({
          tipo: tipoMembresiaEntity,
          nombre: membresia.nombre,
          descripcion: membresia.beneficios,
          precio: membresia.precio,
          creditosOtorgados: null,
          metadata: { 
            membresiaTipoId: membresia.id,
            duracionDias: membresia.duracionDias
          }
        });
      }
    }

    let createdCount = 0;

    for (const item of items) {
      const exists = await this.tiendaItemRepository.findOne({ 
        where: { nombre: item.nombre } 
      });

      if (!exists) {
        await this.tiendaItemRepository.save(item);
        createdCount++;
      }
    }

    if (createdCount > 0) {
      console.log(`  ✓ Items de tienda creados: ${createdCount} (${items.length - createdCount} ya existían)`);
    } else {
      console.log(`  ⚠ Todos los items de tienda ya existían`);
    }
  }

  private async seedAdminUser() {
    const adminNickname = 'admin';
    const adminEmail = 'admin@esports.com';
    
    // Verificar si ya existe
    const existingUser = await this.usuarioRepository.findOne({
      where: { nickname: adminNickname },
    });

    if (existingUser) {
      console.log('  ⚠ Usuario administrador ya existe');
      return;
    }

    // Obtener rol de admin y género
    const rolAdmin = await this.rolRepository.findOne({ where: { valor: 'admin' } });
    const genero = await this.generoRepository.findOne({ where: { valor: 'Masculino' } });

    if (!rolAdmin) {
      throw new Error('Rol admin no encontrado. Ejecuta los seeds de roles primero.');
    }

    // Crear persona
    const persona = this.personaRepository.create({
      pNombre: 'Administrador',
      pApellido: 'Sistema',
      correo: adminEmail,
      fechaNacimiento: '1990-01-01',
      genero: genero,
      timezone: 'America/Mexico_City',
    });

    await this.personaRepository.save(persona);

    // Hashear password
    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    // Crear usuario
    const usuario = this.usuarioRepository.create({
      persona: persona,
      nickname: adminNickname,
      rol: rolAdmin,
      password: hashedPassword,
      estado: 'activo',
      xp: 0,
      saldo: '0',
      creditos: 1000,
      desafiosHabilitados: true,
    });

    await this.usuarioRepository.save(usuario);
    
    console.log('  ✓ Usuario administrador creado:');
    console.log('    - Nickname: admin');
    console.log('    - Password: Admin123!');
    console.log('    - Email: admin@esports.com');
  }
}
