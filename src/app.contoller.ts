import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';

@ApiTags('app-controller')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'get-info' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get git info',
  })
  @HttpCode(HttpStatus.CREATED)
  getInfo(): string {
    const rev = fs.readFileSync('.git/HEAD').toString().trim();
    const commitHash = fs
      .readFileSync('.git/' + rev.substring(5))
      .toString()
      .trim();

    return `MrMrs: Running ${process.env.NODE_ENV} version, last commit: ${commitHash}`;
  }
}
