import { Body, Controller, HttpStatus, Inject, Post } from "@nestjs/common"
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from "@nestjs/swagger"
import { ApiTagsEnum } from "../enums/apitags.enum"
import { CreateInteractionDTO } from "../interaction/interaction.dto"
import { IInteractionService } from "../interaction/interactions.iservice"
import { InvalidBudgetError } from "../exceptions/errors.model"
import BaseResponse from "../utils/api/httpresponses/baseresp.model"
import BaseExceptionResponse from "../utils/api/httpresponses/basexcep.model"

@Controller('interactions')
export class InteractionsController {
    constructor(@Inject(IInteractionService) private readonly intService: IInteractionService) { }
    @ApiExtraModels(BaseResponse)
    @ApiCreatedResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(BaseResponse) },
            ],
        },
        description: 'Campaigns',
    })
    @ApiUnauthorizedResponse({
        type: BaseExceptionResponse,
        description: 'Unauthorized',
    })
    @ApiTags(ApiTagsEnum.CAMPAIGNS)
    @ApiBody({ type: CreateInteractionDTO })
    @Post('/interactions')
    async saveInteraction(@Body() createInteraction: CreateInteractionDTO) {
        try {
            await this.intService.create(createInteraction)
            return new BaseResponse(HttpStatus.CREATED, "interaction successfully created", null)
        } catch (error) {
            throw new BaseExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }
}