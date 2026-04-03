import { Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './entities/project.entity'
import { CreateProjectUseCase } from './use-cases/create-project.use-case'
import { ProjectWithUseCaseController } from './project-with-use-case.controller'
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case'
import { StartProjectUseCase } from './use-cases/start-project.use-case'
import { ProjectTypeOrmRepository } from './repositories/project-type-orm.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectWithUseCaseController],
  providers: [
    ProjectService,
    FindAllProjectsUseCase,
    CreateProjectUseCase,
    StartProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository,
    },
  ],
})
export class ProjectModule {}
