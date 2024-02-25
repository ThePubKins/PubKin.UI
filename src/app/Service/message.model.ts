export class Message {
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: number;
  updatedAt: number;
  status?: 'sent' | 'delivered' | 'read';
  messageId?: string;
}