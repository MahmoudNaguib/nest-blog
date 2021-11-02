import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
@Controller('/')
export class HomeController {
  @Get()
  index() {
    return `Home page`;
  }
}
