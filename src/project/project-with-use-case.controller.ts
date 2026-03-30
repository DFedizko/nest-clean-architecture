import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { CreateProjectUseCase } from './use-cases/create-project.use-case'
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case'
import { StartProjectDto } from './dto/start-project.dto'
import { StartProjectUseCase } from './use-cases/start-project.use-case'

@Controller('project')
export class ProjectWithUseCaseController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase

  @Inject(FindAllProjectsUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute()
  }

  @Post()
  create(@Body() body: CreateProjectDto) {
    return this.createProjectUseCase.execute(body)
  }

  @Post(':id/start')
  update(@Param('id') id: string, @Body() body: Omit<StartProjectDto, 'id'>) {
    return this.startProjectUseCase.execute({
      id,
      startedAt: body.startedAt,
    })
  }
}
