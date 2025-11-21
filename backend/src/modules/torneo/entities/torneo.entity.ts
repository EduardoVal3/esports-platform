import { CatalogoPlataforma } from "src/modules/catalogo-plataforma/entities/catalogo-plataforma.entity";
import { CatalogoRegion } from "src/modules/catalogo-region/entities/catalogo-region.entity";
import { CatalogoTipoEntrada } from "src/modules/catalogo-tipo-entrada/entities/catalogo-tipo-entrada.entity";
import { Juego } from "src/modules/juego/entities/juego.entity";
import { ModoJuego } from "src/modules/modo-juego/entities/modo-juego.entity";
import { TorneoInscripcion } from "src/modules/torneo-inscripcion/entities/torneo-inscripcion.entity";
import { TorneoPremio } from "src/modules/torneo-premio/entities/torneo-premio.entity";
import { TorneoRed } from "src/modules/torneo-red/entities/torneo-red.entity";
import { TorneoResultado } from "src/modules/torneo-resultado/entities/torneo-resultado.entity";
import { Usuario } from "src/modules/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'torneo' })
export class Torneo {
@PrimaryGeneratedColumn('uuid')
id: string;


@ManyToOne(() => Usuario, { nullable: false })
@JoinColumn({ name: 'anfitrion_id' })
anfitrion: Usuario;


@ManyToOne(() => Juego)
@JoinColumn({ name: 'juego_id' })
juego: Juego;


@ManyToOne(() => CatalogoPlataforma)
@JoinColumn({ name: 'plataforma_id' })
plataforma: CatalogoPlataforma;


@ManyToOne(() => ModoJuego)
@JoinColumn({ name: 'modo_juego_id' })
modoJuego: ModoJuego;


@Column({ name: 'titulo' })
titulo: string;


@Column({ name: 'descripcion', type: 'text', nullable: true })
descripcion?: string;


@Column({ name: 'fecha_inicio_registro', type: 'timestamp', nullable: true })
fechaInicioRegistro?: Date;


@Column({ name: 'fecha_fin_registro', type: 'timestamp', nullable: true })
fechaFinRegistro?: Date;


@Column({ name: 'fecha_inicio_torneo', type: 'timestamp', nullable: true })
fechaInicioTorneo?: Date;


@ManyToOne(() => CatalogoRegion, { nullable: false })
@JoinColumn({ name: 'region_id' })
region: CatalogoRegion;


@Column({ name: 'tipo_torneo', nullable: true })
tipoTorneo?: string;


@Column({ name: 'al_mejor_de', type: 'int', default: 1 })
alMejorDe: number;


@Column({ name: 'formato', nullable: true })
formato?: string;


@Column({ name: 'cerrado', type: 'boolean', default: false })
cerrado: boolean;


@Column({ name: 'reglas', type: 'text', nullable: true })
reglas?: string;


@Column({ name: 'jugadores_pc_permitidos', type: 'boolean', default: true })
jugadoresPcPermitidos: boolean;


@Column({ name: 'requiere_transmision', type: 'boolean', default: false })
requiereTransmision: boolean;


@Column({ name: 'requiere_camara', type: 'boolean', default: false })
requiereCamara: boolean;


@ManyToOne(() => CatalogoTipoEntrada, { nullable: false })
@JoinColumn({ name: 'tipo_entrada_id' })
tipoEntrada: CatalogoTipoEntrada;


@Column({ name: 'capacidad', type: 'int', nullable: true })
capacidad?: number;


@OneToMany(() => TorneoInscripcion, (ti) => ti.torneo)
inscripciones: TorneoInscripcion[];


@OneToMany(() => TorneoRed, (tr) => tr.torneo)
redes: TorneoRed[];


@OneToMany(() => TorneoPremio, (tp) => tp.torneo)
premios: TorneoPremio[];


@OneToMany(() => TorneoResultado, (tr) => tr.torneo)
resultados: TorneoResultado[];
}