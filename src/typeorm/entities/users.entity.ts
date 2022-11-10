import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id_user: number;

	@Column({ type: 'varchar', length: 20, nullable: false, unique: true })
	name: string;

	@Column({
		type: 'numeric',
		nullable: false,
		unique: true,
	})
	runk: number;
}
