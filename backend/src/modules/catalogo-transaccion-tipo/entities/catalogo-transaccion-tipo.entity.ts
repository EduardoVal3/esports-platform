import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'catalogo_transaccion_tipo' })
export class CatalogoTransaccionTipo {
@PrimaryGeneratedColumn('uuid', { name: 'id' })
id: string;


@Column({ name: 'valor', unique: true })
valor: string; // 'saldo','creditos'


@CreateDateColumn({ name: 'creado_en' })
creadoEn: Date;
}