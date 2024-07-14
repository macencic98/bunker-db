import { Injectable } from '@nestjs/common';
import { Platform as PlatformModel } from './platform.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPlatformRepository } from './platform.irepository';
import { Platform } from './platform.entity';

@Injectable()
export class PlatformSQLRepository implements IPlatformRepository {
  constructor(
    @InjectRepository(Platform)
    private platformRepo: Repository<Platform>,
  ) {}

  async findOneById(id: number): Promise<PlatformModel> {
    throw new Error('Method not implemented.');
  }
}

