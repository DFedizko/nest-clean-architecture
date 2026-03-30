import { Injectable } from '@nestjs/common'
import { Project } from '../entities/project.entity'
import type { IProjectRepository } from './project-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProjectTypeOrmRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepo.find()
  }

  findById(id: string): Promise<Project> {
    return this.projectRepo.findOneOrFail({ where: { id } })
  }

  async create(project: Project): Promise<void> {
    await this.projectRepo.save(project)
  }

  async update(project: Project): Promise<void> {
    await this.projectRepo.update(project.id, project)
  }
}
