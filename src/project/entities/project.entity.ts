import { Column, Entity, PrimaryColumn } from 'typeorm'

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  declare id: string

  @Column()
  declare name: string

  @Column()
  declare description: string

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending

  @Column({ nullable: true, type: 'datetime' })
  declare startedAt: Date | null

  @Column({ nullable: true, type: 'datetime' })
  declare cancelledAt: Date | null

  @Column({ nullable: true, type: 'datetime' })
  declare finishedAt: Date | null

  @Column({ nullable: true, type: 'datetime' })
  declare forecastedAt: Date | null

  constructor(
    props: {
      name: string
      description: string
      status?: ProjectStatus
      startedAt?: Date | null
      createdAt?: Date | null
      forecastedAt?: Date | null
    },
    id?: string,
  ) {
    Object.assign(this, props)
    this.id = id ?? crypto.randomUUID()

    if (props?.startedAt) {
      this.start(props.startedAt)
    }
  }

  start(startedAt: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error('Cannot start activated project.')
    }

    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project.')
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start cancelled project.')
    }

    this.startedAt = startedAt
    this.status = ProjectStatus.Active
  }
}
