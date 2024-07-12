import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'campaigns',
  entities: [ '../bunker-marketing-app/entities/*.entity.{js,ts}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
