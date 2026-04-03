import { Inject, Injectable } from '@nestjs/common'
import { StartProjectDto } from '../dto/start-project.dto'
import type { IProjectRepository } from '../repositories/project-repository.interface'

@Injectable()
export class StartProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute(input: StartProjectDto) {
    const project = await this.projectRepo.findById(input.id)
    project.start(input.startedAt)
    await this.projectRepo.update(project)
    return project
    // if (input.cancelledAt) {
    //   if (project.status === ProjectStatus.Completed) {
    //     throw new Error('Cannot cancel completed project.')
    //   }

    //   if (project.status === ProjectStatus.Cancelled) {
    //     throw new Error('Cannot cancel cancelled project.')
    //   }

    //   if (project.startedAt && input.cancelledAt < project.startedAt) {
    //     throw new Error('Cannot cancel project before it started')
    //   }

    //   project.cancelledAt = input.cancelledAt
    //   project.status = ProjectStatus.Cancelled
    // }

    // if (input.finishedAt) {
    //   if (project.status === ProjectStatus.Completed) {
    //     throw new Error('Cannot finish completed project.')
    //   }

    //   if (project.status === ProjectStatus.Cancelled) {
    //     throw new Error('Cannot finish cancelled project.')
    //   }

    //   if (project.startedAt && input.finishedAt < project.startedAt) {
    //     throw new Error('Cannot cancel project before it started')
    //   }

    //   project.finishedAt = input.finishedAt
    //   project.status = ProjectStatus.Completed
    // }
  }
}
