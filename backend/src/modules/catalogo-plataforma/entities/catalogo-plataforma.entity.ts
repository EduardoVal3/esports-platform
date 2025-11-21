import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'catalogo_plataforma' })
export class CatalogoPlataforma {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;


    @Column({ name: 'valor', unique: true })
    valor: string; // e.g. 'PlayStation','Xbox','PC','Movil','Multiplataforma'


    @CreateDateColumn({ name: 'creado_en' })
    creadoEn: Date;
}