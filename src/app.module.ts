import { Module } from '@nestjs/common'
import { ProjectModule } from './project/project.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './project/entities/project.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Project],
      synchronize: true,
    }),
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
