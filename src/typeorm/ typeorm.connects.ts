import { DataSource } from 'typeorm';
import { IUser, IUsersList } from '../users/users.interfaces';
import { typeOrmConfig } from './ typeeorm.config';
import { Users } from './entities/users.entity';

export class TypeOrmConnects {
	private dataSource: DataSource;
	constructor() {
		this.dataSource = new DataSource(typeOrmConfig);
	}

	// Connection to DB
	async initialize(): Promise<void> {
		try {
			await this.dataSource.initialize();
			console.log('Connection to BD(TypeORM) successful');
		} catch (err) {
			console.log('Error connection to DB');
			throw err;
		}
	}

	// Return list of users
	async sendUsersList(inputData: IUsersList): Promise<IUser[] | undefined> {
		return await this.dataSource
			.getRepository(Users)
			.createQueryBuilder('us')
			.select('us.id_user')
			.addSelect('us.name')
			.addSelect('us.runk')
			.orderBy(`us.${inputData.sort}`)
			.getMany();
	}
}
