import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HelpTicket } from '../resources/data/help-ticket-object';

@inject(Router, HelpTicket)



export class HelpTickets {
    constructor(router, helpTicket) {
        this.router = router;
        this.helpTickets = helpTicket;
        this.showHelpTicketEditForm = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }


    async activate() {
        this.helpTickets.getHelpTickets(this.userObj);
    }
    attached() {
        feather.replace()
    }

    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#firstName").focus(); }, 500);
    }

    back(){
        this.showHelpTicketEditForm = false;
    }

    async getHelpTickets() {
        await this.helpTickets.getHelpTickets(this.userObj);
      }

    newHelpTicket() {
        this.helpTicket = {
            title: "",
            personId: this.userObj._id,
            ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
            status: 'new'
        };
        
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        this.showEditForm();
    }

    
    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpTicket._id)
        this.showEditForm();
    }


    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerId = this.userObj._id;
            }
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets();
            this.back();
        }
    }

    async delete() {
        if (this.helpTicket) {
          await this.helpTickets.delete(this.helpTicket);
          await this.getHelpTickets();
          this.back();
        }
      }

}