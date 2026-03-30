import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from '../entities/project.entity'
import { Repository } from 'typeorm'
import { StartProjectDto } from '../dto/start-project.dto'

@Injectable()
export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async execute(input: StartProjectDto) {
    const project = await this.projectRepo.findOneOrFail({
      where: { id: input.id },
    })
    project.start(input.startedAt)
    return await this.projectRepo.save(project)
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
