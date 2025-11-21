import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'catalogo_rol' })
export class CatalogoRol {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'valor', unique: true })
    valor: string; // e.g. 'usuario','admin'

    @CreateDateColumn({ name: 'creado_en' })
    creadoEn: Date;
}