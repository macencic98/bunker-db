import { Injectable } from '@nestjs/common';
import { Platform } from '../../../../core/domain/entities/platform.entity';
import { Platform as PlatformModel } from '../../../../core/domain/models/platform.model';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { IPlatformRepository } from '../../../../core/ports/adapters/outbound/platform.irepository';

@Injectable()
export class PlatformSQLRepository implements IPlatformRepository {
  constructor(
    @InjectRepository(Platform)
    private campaignRepository: Repository<Platform>,
  ) {}

  async findOneById(id: number): Promise<PlatformModel> {
    throw new Error('Method not implemented.');
  }
}

