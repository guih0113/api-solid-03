import { Gym } from 'generated/prisma'
import { GymsRepository } from '@/repositories/gyms-repository'


interface CreateGymUseCaseRequest {
  title: string
  description: string | null // null caso não seja informado
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ 
    title, description, phone, latitude, longitude 
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title, 
      description, 
      phone, 
      latitude, 
      longitude,
    })

    return {
      gym
    }
  }
}