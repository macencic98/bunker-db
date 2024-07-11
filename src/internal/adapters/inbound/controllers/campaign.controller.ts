
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiTagsEnum } from 'src/enums/apitags.enum';
import { CreateCampaignDto, CreateCampaignResponse } from 'src/internal/core/domain/dto/campaign.dto';
import { ICampaignService } from 'src/internal/core/ports/campaign.iservice';
import BaseResponse from 'src/internal/utils/api/httpresponses/baseresp.model';
import BaseExceptionResponse from 'src/internal/utils/api/httpresponses/basexcep.model';


@Controller('campaign')
export class CampaignController {
  constructor(@Inject(ICampaignService) private readonly campService: ICampaignService) { }
  //constructor(private readonly campService: ICampaignService) {}

  @ApiExtraModels(BaseResponse, CreateCampaignResponse)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'object',
              items: { $ref: getSchemaPath(CreateCampaignResponse) },
            },
          },
        },
      ],
    },
    description: 'Campaigns',
  })
  @ApiUnauthorizedResponse({
    type: BaseExceptionResponse,
    description: 'Unauthorized',
  })
  @ApiConflictResponse({
    type: BaseExceptionResponse,
    description: 'Duplicate Campaign name',
  })
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @ApiBody({ type: CreateCampaignDto })
  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    this.campService.create(createCampaignDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.campService.findOneById(+id);
  }

}
