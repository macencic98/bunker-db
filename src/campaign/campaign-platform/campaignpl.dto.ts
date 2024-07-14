import { IsNotEmpty, IsNumber, IsPositive } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PlatformInteractionMetricsDTO {
    @ApiProperty()
    type: string;

    @ApiProperty()
    quantity: number;
}

export class PlatformDTOResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    tag: string;

    @ApiProperty()
    platformBudget: number;

    @ApiProperty({ type: [PlatformInteractionMetricsDTO] })
    interactions: PlatformInteractionMetricsDTO[];
}

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
