import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'catalogo_tipo_entrada' })
export class CatalogoTipoEntrada {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;


    @Column({ name: 'valor', unique: true })
    valor: string; // e.g. 'mando','teclado','todos'


    @CreateDateColumn({ name: 'creado_en' })
    creadoEn: Date;
}