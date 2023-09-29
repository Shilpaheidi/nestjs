import { ApiProperty } from "@nestjs/swagger";
import { Ticket } from "src/interfce/ticket.model";

export class TicketsInfo  {
  
    @ApiProperty()
    id: number;
    @ApiProperty()

    title: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    description: string;
 
 
}

export class TicketsUpdateInfo {
    @ApiProperty()
    id: number;
    @ApiProperty()
    updatedData: TicketsInfo;
  }
 