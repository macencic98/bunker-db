import { ApiProperty } from '@nestjs/swagger';
import { PlatformDTOResponse } from './campaignpl.dto';
import { IsOptional, IsPositive, IsNumber, IsNotEmpty } from '@nestjs/class-validator';


export class CampaignPlatformDto {
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  readonly platformBudget: number;
}

export class CreateCampaignDto {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @ApiProperty()
  @IsNotEmpty()
  name: string;
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
  @ApiProperty({ type: [CampaignPlatformDto] })
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
