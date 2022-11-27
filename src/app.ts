import express, { Express } from 'express';
import { UsersRouter } from './users/users.controller';
import bodyParser from 'body-parser';
import { typeOrmConnects } from '../index';
import { errorMiddleware } from './errors/ error.middleware';

export class ServerOrganization {
  private app: Express;
  private port: number;

  constructor(usersrouter: UsersRouter) {
    this.app = express();
    this.port = 3000;
    this.appBodyParcer();
    this.routingUser(usersrouter);
    this.errorMiddleware();
  }

  // Processing Request Body
  private appBodyParcer(): void {
    this.app.use(bodyParser.json());
  }

  // routerUsers
  private routingUser(usersrouter: UsersRouter): void {
    this.app.use('/users', usersrouter.router);
  }

  // Error exeption
  private errorMiddleware(): void {
    this.app.use(errorMiddleware);
  }

  // Listen server
  async init(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Server is started, PORT ${this.port}`);
    });
    await typeOrmConnects.initialize();
  }
}
