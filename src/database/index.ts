import { createConnection } from 'typeorm';
require('dotenv').config();

const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

const extencionFile = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

const config: any = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  entities: [rootDir + `/models/*.${extencionFile}`],
  migrations: [rootDir + `/database/migrations/*.${extencionFile}`],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
  },
};

createConnection(config).catch(error => console.log(error));
