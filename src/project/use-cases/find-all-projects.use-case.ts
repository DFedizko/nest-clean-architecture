import { Inject, Injectable } from '@nestjs/common'
import type { IProjectRepository } from '../repositories/project-repository.interface'

@Injectable()
export class FindAllProjectsUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute() {
    return this.projectRepo.findAll()
  }
}
