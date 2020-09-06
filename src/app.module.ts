import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './shared/models/users/users.entity';
import { AuthModule } from './auth/auth.module';
import { log } from 'util';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: null,
        database: 'nest_js',
        entities: [User],
        synchronize: true,
        migrationsRun: true,
        logging: true,
        migrationsTableName: 'migration_table',
        migrations: [
          __dirname + '/../migrations/*{.ts,.js}'
        ],
        charset: 'utf8'
      }
    ),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
