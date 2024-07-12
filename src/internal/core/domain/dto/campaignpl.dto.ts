import { ApiProperty } from "@nestjs/swagger";
import { IsPositive } from "class-validator";

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
