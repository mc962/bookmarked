import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Bookmark {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @Column()
    url!: string;

    @Column()
    sync_transaction_url!: string;

    @Column()
    meta_info!: string;

    @Column()
    folder_path!: string;
}
