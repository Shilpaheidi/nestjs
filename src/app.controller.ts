import { Body, Controller, Get, Patch, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TicketsInfo, TicketsUpdateInfo } from './dto/ticket.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getAllRecords') // Define a GET request handler for retrieving all records
  async getAllRecords() {
    const records = await this.appService.getAllRecords();
    return { records }; // Return the records as JSON
  }

  @Post('insert-tickets')
  insertingCards(@Body() tickets: TicketsInfo) {
    return this.appService.insertCard(tickets);
  }

  @Post('update-tickets')

  async updatingCards(@Body() tickets: TicketsUpdateInfo) {
    try {
      const { id, updatedData } = tickets; // Destructure the properties from the TicketsInfo object
      await this.appService.updateCard(id, updatedData);
      return { message: 'Card updated successfully' };
    } catch (error) {
      return { error: 'Failed to update card' };
    }
  }
}
