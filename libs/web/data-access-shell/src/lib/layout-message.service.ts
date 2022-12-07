import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable()
export class LayoutMessageService {
  constructor(private messageService: MessageService) {}

  addErrorMessage(message: Omit<Message, 'severity'>) {
    this.messageService.add({ ...message, severity: 'error' });
  }

  addSuccessMessage(message: Omit<Message, 'severity'>) {
    this.messageService.add({ ...message, severity: 'success' });
  }

  clear() {
    this.messageService.clear();
  }
}
