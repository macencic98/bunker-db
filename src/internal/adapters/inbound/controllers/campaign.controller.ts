
import {
  Body,
  Controller,
  Delete,
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
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiTagsEnum } from 'src/enums/apitags.enum';
import { CampaignResponse, CreateCampaignDto, CreateCampaignResponse, UpdateCampaignDto } from 'src/internal/core/domain/dto/campaign.dto';
import { ICampaignService } from 'src/internal/core/ports/campaign.iservice';
import BaseResponse from 'src/internal/utils/api/httpresponses/baseresp.model';
import BaseExceptionResponse from 'src/internal/utils/api/httpresponses/basexcep.model';
import { Mapper } from './response.mapper';
import { Campaign } from 'src/internal/core/domain/models/campaign.model';
import { HttpStatus } from '@nestjs/common';
import { InvalidBudgetError } from 'src/internal/core/services/errors.model';


@Controller('campaign')
export class CampaignController {
  constructor(@Inject(ICampaignService) private readonly campService: ICampaignService) { }

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
    description: 'Duplicated Campaign name',
  })
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @ApiBody({ type: CreateCampaignDto })
  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    try{
      let createdCampaign = await this.campService.create(createCampaignDto)
    if(createdCampaign != undefined){
      return Mapper.toCreateCampaignResponse(createdCampaign)
    } 
  }catch(error){
    if(error instanceof InvalidBudgetError){
      throw new BaseExceptionResponse(HttpStatus.BAD_REQUEST, error.message)
    }

    throw new BaseExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
    throw new BaseExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, "error")
  }

  @ApiExtraModels(BaseResponse, CampaignResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'object',
              items: { $ref: getSchemaPath(CampaignResponse) },
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
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    let campaign: Campaign = await this.campService.findOneById(id);
    if(campaign == undefined){
      throw new BaseExceptionResponse(HttpStatus.NOT_FOUND, "campaign not found")
    }

    return Mapper.toSingleCampaignResponse(campaign);
  }


  @ApiExtraModels(BaseResponse, CampaignResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(CampaignResponse) },
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
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Get()
  async findAll() {
    return Mapper.toMultipleCampaignsResponse(await this.campService.findAll());
  }

  @ApiExtraModels(BaseResponse, CampaignResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(CampaignResponse) },
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
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.campService.delete(id)
  }

  @ApiExtraModels(BaseResponse, CampaignResponse)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponse) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(CampaignResponse) },
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
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Delete(':id')
  async update(@Param('id') id: number, @Body() updateCampaignDto: UpdateCampaignDto) {
    updateCampaignDto.id = id
    return Mapper.toupdateCampaignResponse(await this.campService.update(updateCampaignDto))
  }
}