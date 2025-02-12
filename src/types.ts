// src/types/index.ts
export type InsightCategory = "Immediate Action Required" | "Needs Attention" | "Good Practice";

export interface ErrorCitation {
  section: InsightCategory;
  insight: string;
  webpage_url: string;
  filename?: string;
  business_id?: number;
}

export interface PageReport {
  website_url: string;
  insights_count: Record<InsightCategory, number>;
  error_citations: ErrorCitation[];
  filename?: string;
}

export interface Report {
  _id: string;
  business_id: number;
  report_date: string;
  insights_count: {
    "Good Practice": number;
    "Immediate Action Required": number;
    "Needs Attention": number;
  };
  insights_breakdown: Record<string, number>;
  total_insights: number;
  page_reports: PageReport[];
}

export interface Webpage {
  _id: string;
  filename: string;
}

export interface Message {
  role: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  lastUpdated: string;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  presence_penalty: number;
  vectorStore: string;
  prompt: string;
}

// types/business.ts
export interface BBBInfo {
  BBB_accreditation: string;
  BBB_rating: string;
  BBB_reason_for_rating: string;
}

export interface Product {
  name: string;
  description: string;
  url: string;
}

export interface CustomerReview {
  name: string;
  age: number;
  location: string;
  comment: string;
}

export interface Promotion {
  title: string;
  discount: string;
  details: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface BusinessDetails {
  _id: string;
  name: string;
  description: string;
  contact_information?: {
    address?: string;
    email?: string;
    phone?: string;
  };
  benefits?: string[];
  website?: string;
}

export interface ExtendedBusinessDetails extends BusinessDetails {
  additional_info: BBBInfo;
  products: Product[];
  customer_reviews: CustomerReview[];
  promotions: Promotion[];
  social_media: SocialMedia[];
}