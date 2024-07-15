
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiTagsEnum } from '../enums/apitags.enum';
import { CampaignResponse, CreateCampaignDto, CreateCampaignResponse, UpdateCampaignDto } from './campaign.dto';
import BaseResponse from '../utils/api/httpresponses/baseresp.model';
import BaseExceptionResponse from '../utils/api/httpresponses/basexcep.model';
import { Mapper } from './campaignrsp.mapper';
import { HttpStatus } from '@nestjs/common';
import { InvalidBudgetError } from '../exceptions/errors.model';
import { connectionSource } from 'ormconfig';
import { ICampaignService } from './campaign.iservice';
import { Campaign } from './campaign.model';

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
  @ApiConflictResponse({
    type: BaseExceptionResponse,
    description: 'Duplicated Campaign name',
  })
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @ApiBody({ type: CreateCampaignDto })
  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    console.log(connectionSource)
    try {
      let createdCampaign = await this.campService.create(createCampaignDto)
      if (createdCampaign != undefined) {
        return new BaseResponse(HttpStatus.CREATED, "success", { "campaign": Mapper.toCreateCampaignResponse(createdCampaign) });
      }
    } catch (error) {
      if (error instanceof InvalidBudgetError) {
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
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      let campaign: Campaign = await this.campService.findOneById(id);
      if (campaign == undefined) {
        return new BaseResponse(HttpStatus.NOT_FOUND, "campaign not found", null);
      }

      return new BaseResponse(HttpStatus.CREATED, "success", { "campaign": Mapper.toSingleCampaignResponse(campaign) });
    } catch (error) {
      if (error instanceof InvalidBudgetError) {
        throw new BaseExceptionResponse(HttpStatus.BAD_REQUEST, error.message)
      }
      throw new BaseExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    }

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
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Get()
  async findAll() {
    try {
      return new BaseResponse(HttpStatus.CREATED, "success", { "campaign": Mapper.toMultipleCampaignsResponse(await this.campService.findAll()) });
    } catch (error) {
      throw new BaseExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  @ApiExtraModels(BaseResponse, CampaignResponse)
  @ApiNoContentResponse({
    description: 'Campaigns',
  })
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.campService.delete(id)
      return new BaseResponse(HttpStatus.NO_CONTENT, "success", null)
    }
    catch (error) {
      if(error instanceof NotFoundException){
        throw new BaseExceptionResponse(HttpStatus.NOT_FOUND, error.message)
      }
      throw new BaseExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
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
  @ApiTags(ApiTagsEnum.CAMPAIGNS)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCampaignDto: UpdateCampaignDto) {
    try {
      updateCampaignDto.id = id
      await this.campService.update(updateCampaignDto)
      return new BaseResponse(HttpStatus.OK, "success", null)
    } catch (error) {
      if(error instanceof NotFoundException){
        throw new BaseExceptionResponse(HttpStatus.NOT_FOUND, error.message)
      }
      throw new BaseExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    }

  }
}