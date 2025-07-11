import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsnRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsnRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsnRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsnRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsnRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01'
    })

    expect(checkInsCount).toEqual(2)
  })
})  