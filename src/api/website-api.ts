// utils/website-api.ts

// Define global base URL
const BASE_URL = 'http://127.0.0.1:8000';

interface AnalysisResponse {
  success: boolean;
  message?: string;
  url?: string;
  status?: string;
  scan_status?: string;  // Added for different scan states
  error?: string;
  error_message?: string;  // Added for detailed error messages
  business_id?: string;
  pages_scanned?: number;
  total_pages?: number;
  current_step?: string;
  estimated_time_remaining?: number;
  progress_percentage?: number;
  report_generated?: boolean;
  last_updated?: string;
  website_url?: string;
  isComplete?: boolean;
}

export const submitWebsiteForAnalysis = async (url: string): Promise<AnalysisResponse> => {
  try {
    console.log('Starting website submission for URL:', url);
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    console.log('Making API request to analyze endpoint');
    const response = await fetch(`${BASE_URL}/api/data/analysis/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ website_url: url })
    });
    
    console.log('Received response:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    
    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Failed to submit website');
    }
    
    return {
      success: true,
      message: data.message,
      url: data.website_url || url,
      status: data.status,
      scan_status: data.scan_status,
      business_id: data.business_id
    };
  } catch (error) {
    console.error('Error in submitWebsiteForAnalysis:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const checkAnalysisStatus = async (): Promise<AnalysisResponse> => {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    console.log('Requesting status update...');
    const response = await fetch(`${BASE_URL}/api/data/analysis/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    console.log('Status response received:', response.status);
    const data = await response.json();
    console.log('Status data:', data);
    
    if (!response.ok) {
      throw new Error(data.detail || 'Failed to check status');
    }
    
    return {
      success: true,
      status: data.status,
      scan_status: data.scan_status,
      error_message: data.error_message,
      pages_scanned: data.pages_scanned,
      total_pages: data.total_pages,
      current_step: data.current_step,
      estimated_time_remaining: data.estimated_time_remaining,
      progress_percentage: data.progress_percentage,
      business_id: data.business_id,
      report_generated: data.report_generated,
      last_updated: data.last_updated,
      website_url: data.websiteUrl || data.website_url,
      isComplete: data.status === 'complete' || data.isComplete
    };
  } catch (error) {
    console.error('Error checking status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const getAnalysisData = async () => {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${BASE_URL}/api/data/analysis`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to retrieve analysis data');
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to retrieve analysis data');
    }
    
    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error retrieving analysis data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};