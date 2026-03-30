/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { Repository } from 'typeorm'
import { Project, ProjectStatus } from './entities/project.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto)

    if (createProjectDto.startedAt) {
      project.status = ProjectStatus.Active
    }

    return this.projectRepo.save(project)
  }

  findAll() {
    return this.projectRepo.find()
  }

  findOne(id: string) {
    return this.projectRepo.findOneOrFail({ where: { id } })
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } })

    updateProjectDto?.name && (project.name = updateProjectDto.name)

    updateProjectDto?.description &&
      (project.description = updateProjectDto.description)

    if (updateProjectDto.startedAt) {
      if (project.status === ProjectStatus.Active) {
        throw new Error('Cannot start activated project.')
      }

      if (project.status === ProjectStatus.Completed) {
        throw new Error('Cannot start completed project.')
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot start cancelled project.')
      }

      project.startedAt = updateProjectDto.startedAt
      project.status = ProjectStatus.Active
    }

    if (updateProjectDto.cancelledAt) {
      if (project.status === ProjectStatus.Completed) {
        throw new Error('Cannot cancel completed project.')
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot cancel cancelled project.')
      }

      if (
        project.startedAt &&
        updateProjectDto.cancelledAt < project.startedAt
      ) {
        throw new Error('Cannot cancel project before it started')
      }

      project.cancelledAt = updateProjectDto.cancelledAt
      project.status = ProjectStatus.Cancelled
    }

    if (updateProjectDto.finishedAt) {
      if (project.status === ProjectStatus.Completed) {
        throw new Error('Cannot finish completed project.')
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Cannot finish cancelled project.')
      }

      if (
        project.startedAt &&
        updateProjectDto.finishedAt < project.startedAt
      ) {
        throw new Error('Cannot cancel project before it started')
      }

      project.finishedAt = updateProjectDto.finishedAt
      project.status = ProjectStatus.Completed
    }

    return await this.projectRepo.save(project)
  }

  remove(id: string) {
    return `This action removes a #${id} project`
  }
}
