export type EngineType = 'gasoline' | 'diesel' | 'hybrid' | 'electric'

export type Transmission = 'automatic' | 'manual' | 'cvt'

export type Drivetrain = 'fwd' | 'rwd' | 'awd'

export type Trim = {
  id: number
  name: string
  engineSize: number
  horsepower: number
  engineType: EngineType
  transmission: Transmission
  drivetrain: Drivetrain
  modelId: number
  createdAt: Date
  updatedAt: Date
}

export type TrimWithNameAndId = Pick<Trim, 'id' | 'name'>
