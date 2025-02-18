// utils/api.ts

interface SubmitWebsiteResponse {
    success: boolean;
    message?: string;
    error?: string;
  }
  
  export const submitWebsiteForAnalysis = async (url: string): Promise<SubmitWebsiteResponse> => {
    try {
      // Get JWT token from localStorage or your auth management system
      const token = localStorage.getItem('jwt_token');
  
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`https://leaps-scraper.onrender.com/api/website/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit website');
      }
  
      const data = await response.json();
      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }