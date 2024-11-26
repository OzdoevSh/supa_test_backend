import {
  Controller, Get, Res, Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(@Req() req: Request, @Res() res: Response) {
    res.redirect('/issues');
  }
}
