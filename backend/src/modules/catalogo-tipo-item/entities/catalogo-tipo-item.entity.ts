import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'catalogo_tipo_item' })
export class CatalogoTipoItem {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;


    @Column({ name: 'valor', unique: true })
    valor: string; // 'creditos','membresia','servicio'


    @CreateDateColumn({ name: 'creado_en' })
    creadoEn: Date;
}