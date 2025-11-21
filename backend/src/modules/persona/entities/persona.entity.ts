import { CatalogoGenero } from "src/modules/catalogo-genero/entities/catalogo-genero.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'persona' })
export class Persona {
@PrimaryGeneratedColumn('uuid', { name: 'id' })
id: string;


@Column({ name: 'p_nombre' })
pNombre: string;


@Column({ name: 's_nombre', nullable: true })
sNombre?: string;


@Column({ name: 'p_apellido' })
pApellido: string;


@Column({ name: 's_apellido', nullable: true })
sApellido?: string;


@Index({ unique: true })
@Column({ name: 'correo', unique: true })
correo: string;


@Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
fechaNacimiento?: string;


@ManyToOne(() => CatalogoGenero, { nullable: true })
@JoinColumn({ name: 'genero_id' })
genero?: CatalogoGenero;


@Column({ name: 'timezone', nullable: true })
timezone?: string;


@CreateDateColumn({ name: 'creado_en' })
creadoEn: Date;


@UpdateDateColumn({ name: 'actualizado_en' })
actualizadoEn: Date;
}