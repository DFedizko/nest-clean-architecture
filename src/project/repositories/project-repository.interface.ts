import { Project } from '../entities/project.entity'

export interface IProjectRepository {
  findAll(): Promise<Project[]>
  findById(id: string): Promise<Project>
  create(project: Project): Promise<void>
  update(project: Project): Promise<void>
}
