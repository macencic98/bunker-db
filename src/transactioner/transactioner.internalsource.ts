import { DataSource } from 'typeorm';
export  class  ConnectionSource {
  static createConnectionSource(): DataSource {
    return new DataSource({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'campaigns',
      entities: ['src/**/**.entity{.ts,.js}'],
      migrations: ['./dist/src/migrations/*.{js,ts}'],
      synchronize: false,
    })
  }
}