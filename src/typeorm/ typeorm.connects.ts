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
			.addSelect('us.rank')
			.orderBy(`us.${inputData.sort}`)
			.getMany();
	}

	// Change user
	async changeUserRank(inputData: IUser): Promise<void> {
		const result = await this.dataSource
			.getRepository(Users)
			.createQueryBuilder()
			.update(Users)
			.set({ rank: inputData.rank })
			.where('name = :id', { id: inputData.name })
			.execute();
		if (result.affected === 0) {
			throw Error('Rank of is not changed');
		}
	}

	// Add user
	async addUser(inputData: IUser): Promise<void> {
		await this.dataSource
			.getRepository(Users)
			.createQueryBuilder()
			.insert()
			.into(Users)
			.values({ name: inputData.name, rank: inputData.rank })
			.execute();
	}

	// Delete user
	async deleteUser(inputData: IUser): Promise<void> {
		const result = await this.dataSource
			.getRepository(Users)
			.createQueryBuilder('us')
			.delete()
			.where('name = :id', { id: inputData.name })
			.execute();
		if (result.affected === 0) {
			throw Error('Deleting user not available');
		}
	}

	// Update user
	async updateUser(inputData: IUser): Promise<void> {
		const result = await this.dataSource
			.getRepository(Users)
			.createQueryBuilder()
			.update(Users)
			.set({ name: inputData.name, rank: inputData.rank })
			.where('id_user = :id', { id: inputData.id_user })
			.execute();
		if (result.affected === 0) {
			throw Error('Updating user not available');
		}
	}
}
