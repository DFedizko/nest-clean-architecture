import { Inject, Injectable } from '@nestjs/common'
import { Project } from '../entities/project.entity'
import type { CreateProjectDto } from '../dto/create-project.dto'
import type { IProjectRepository } from '../repositories/project-repository.interface'

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute(input: CreateProjectDto) {
    const project = new Project(input)
    await this.projectRepo.create(project)
    return project
  }
}
