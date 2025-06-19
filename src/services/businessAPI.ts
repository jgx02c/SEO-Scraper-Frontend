// services/businessApi.ts
import { BusinessDetails, Webpage, Report } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const businessApi = {
  getBusinessById: async (id: string): Promise<BusinessDetails> => {
    const response = await fetch(`${BASE_URL}/business/get_business_by_id/${id}`);
    const result = await response.json();
    return result.data;
  },

  getReportForBusiness: async (id: string): Promise<Report | null> => {
    const response = await fetch(`${BASE_URL}/report/get_report_for_business/${id}`);
    const result = await response.json();
    return result.data || null;
  },

  getPagesByBusinessId: async (id: string): Promise<Webpage[]> => {
    const response = await fetch(`${BASE_URL}/pages/get_pages_by_business_id/${id}`);
    const result = await response.json();
    return result.data || [];
  },

  getPageById: async (pageId: string): Promise<string> => {
    try {
      const response = await fetch(`${BASE_URL}/pages/get_page_by_id/${pageId}`);
      const result = await response.json();
      return result.data?.data?.content || "No content available.";
    } catch (error) {
      console.error("Error fetching webpage content:", error);
      return "Error loading page content.";
    }
  }
};