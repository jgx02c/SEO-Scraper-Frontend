// services/chatApi.ts
import { Conversation, Message, ChatSettings } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const chatApi = {
  getSettings: async (): Promise<ChatSettings> => {
    const response = await fetch(`${BASE_URL}/settings/get_settings`);
    if (!response.ok) throw new Error('Failed to load settings');
    const result = await response.json();
    return result.data;
  },

  saveSettings: async (settings: ChatSettings): Promise<void> => {
    const response = await fetch(`${BASE_URL}/settings/save_settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to save settings');
  },

  getConversations: async (): Promise<Conversation[]> => {
    const response = await fetch(`${BASE_URL}/conversations/get_conversations`);
    if (!response.ok) throw new Error('Failed to load conversations');
    const data = await response.json();
    return data.data || [];
  },

  saveConversation: async (conversationId: string, messages: Message[]): Promise<void> => {
    const response = await fetch(`${BASE_URL}/conversations/save_conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId,
        messages
      }),
    });
    if (!response.ok) throw new Error('Failed to save conversation');
  },

  generateInsight: async (message: string, settings: ChatSettings): Promise<string> => {
    const response = await fetch(`${BASE_URL}/insights/generate_insight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        ...settings
      }),
    });
    if (!response.ok) throw new Error('Failed to generate insight');
    const result = await response.json();
    return result.data;
  }
};