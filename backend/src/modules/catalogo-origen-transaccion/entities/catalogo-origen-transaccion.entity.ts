import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'catalogo_origen_transaccion' })
export class CatalogoOrigenTransaccion {
@PrimaryGeneratedColumn('uuid', { name: 'id' })
id: string;


@Column({ name: 'valor', unique: true })
valor: string; // 'compra','torneo','retiro','admin','tienda'


@CreateDateColumn({ name: 'creado_en' })
creadoEn: Date;
}