import { IsDate, IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDataDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly id: string;
    @ApiProperty()
    readonly additionalProperties?: { [key: string]: any };
}

export class CreateInteractionDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly campaignTag: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly platformTag: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly interactionTypeTag: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly date: Date;
    @ApiProperty()
    @IsNotEmpty()
    readonly userData: UserDataDTO;
}

