import { ApiProperty } from '@nestjs/swagger';
import { CampaignPlatformDto, PlatformDTOResponse } from './campaign-platform/campaignpl.dto';
import { IsOptional, IsPositive, IsNumber, IsNotEmpty } from '@nestjs/class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  tag: string;
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  totalBudget: number;
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;
  @IsOptional()
  @ApiProperty()
  endDate: Date;
  @IsNotEmpty()
  @ApiProperty({ minItems: 1, type: [CampaignPlatformDto] })
  platforms: CampaignPlatformDto[]
}

export class CampaignResponse {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @ApiProperty()
  name: string;
  @ApiProperty()
  totalBudget: number;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ type: [CampaignPlatformDto] })
  platforms: PlatformDTOResponse[]
}

export class CreateCampaignResponse extends CampaignResponse{
  
}

export class UpdateCampaignDto{
  id: number
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @ApiProperty()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsOptional()
  startDate: Date;
  @IsOptional()
  @ApiProperty()
  endDate: Date;
}
