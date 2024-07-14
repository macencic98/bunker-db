import { DataSource } from 'typeorm';

export var connectionSource = new DataSource({
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'campaigns',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['./dist/src/db/migrations/*.js'],
  synchronize: false,
});
