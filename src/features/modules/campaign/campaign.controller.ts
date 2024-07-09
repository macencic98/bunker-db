import { Body, Controller, Get, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { ICampaignService } from './campaign.iservice';
import { CreateCampaignDto } from './campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campService: ICampaignService) {}

  @Post()
async create(@Body() createCampaignDto: CreateCampaignDto) {
  this.campService.create(createCampaignDto);
}

@Get(':id')
async findOne(@Param('id') id: number) {
  return await this.campService.findOne(+id);
}

}
