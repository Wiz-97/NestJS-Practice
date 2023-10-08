import { Controller, Get } from '@nestjs/common';
import { Z_ASCII } from 'zlib';

@Controller('')
export class AppController {
    @Get()
    home(){
        return 'Welcome to my Movie API';
    }
}
