import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from '../entities/project.entity'
import { Repository } from 'typeorm'
import type { CreateProjectDto } from '../dto/create-project.dto'

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async execute(input: CreateProjectDto) {
    const project = new Project(input)
    return this.projectRepo.save(project)
  }
}
