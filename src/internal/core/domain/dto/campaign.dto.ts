import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsNumber} from 'class-validator';


export class CampaignPlatformDto {
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  readonly id: number;
  @ApiProperty()
  readonly platformBudget: number;
}

export class CreateCampaignDto {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  @IsPositive()
  readonly totalBudget: number;
  @ApiProperty()
  readonly endDate: Date;
  @ApiProperty()
  readonly startDate: Date;
  @ApiProperty({ type: [CampaignPlatformDto] })
  readonly platforms: CampaignPlatformDto[]
}


export class CreateCampaignResponse {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly totalBudget: number;
  @ApiProperty()
  readonly endDate: Date;
  @ApiProperty()
  readonly startDate: Date;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
  @ApiProperty()
  readonly deletedAt: Date;
  @ApiProperty({ type: [CampaignPlatformDto] })
  readonly platforms: CampaignPlatformDto[]
}

export class UpdateCampaignDto{

}
