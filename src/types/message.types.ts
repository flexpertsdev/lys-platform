import { User } from './user.types';

export interface Thread {
  id: string;
  subject: string;
  participants: ThreadParticipant[];
  messages: Message[];
  orderId?: string;
  status: 'active' | 'archived' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

export interface ThreadParticipant {
  userId: string;
  user?: User;
  role: 'sender' | 'recipient' | 'participant';
  joinedAt: Date;
  lastReadAt?: Date;
  unreadCount: number;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  sender?: User;
  content: string;
  attachments?: MessageAttachment[];
  isRead: boolean;
  readBy: MessageReadReceipt[];
  createdAt: Date;
  updatedAt?: Date;
  editedAt?: Date;
  replyTo?: string;
}

export interface MessageAttachment {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface MessageReadReceipt {
  userId: string;
  readAt: Date;
}

export interface MessageFilters {
  threadId?: string;
  unreadOnly?: boolean;
  hasAttachments?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}