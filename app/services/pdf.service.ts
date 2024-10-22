import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
 
  generatePdf(ticket: any) {
    const doc = new jsPDF();
    
    const ticketsArray = Array.isArray(ticket) ? ticket : [ticket];
     console.log(ticketsArray);
     
    const ticketData = ticketsArray.map(
      (ticket: {
        ticketPrice: any;
        timing: Date;
        noOfSeat: any;
        ticketId: any;
        date: any;
      }) => [
        ticket.ticketId,
        ticket.date.slice(0,10),
        ticket.noOfSeat,
        ticket.timing,
        ticket.ticketPrice*ticket.noOfSeat,
      ]
    );

    //3
    //  autoTable(doc, { html: '#my-table' })
    autoTable(doc, {
      head: [['TicketID', 'Date', 'NoofSeat', 'Timing', 'Total Price']],
      body: ticketData,
    });
    const pdfOutput = doc.output('blob');
    saveAs(pdfOutput, 'ticket-details.pdf');
  }
}
