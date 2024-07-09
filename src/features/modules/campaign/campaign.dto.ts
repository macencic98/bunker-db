import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';

export class CampaignPlatformDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter a correct name' })
  @IsString({ message: 'The name should be alphanumeric' })
  readonly name: string;
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
  readonly totalBudget: number;
  @ApiProperty()
  readonly endDate: Date;
  @ApiProperty()
  readonly startDate: Date;
  @ApiProperty()
  readonly type: CampaignTypeDto;
  @ApiProperty({ type: [CampaignPlatformDto] })
  readonly platforms: CampaignPlatformDto[]
}



export class CampaignTypeDto {
  @ApiProperty()
  name: string;
}

