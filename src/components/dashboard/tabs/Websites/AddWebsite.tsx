import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Info
} from "lucide-react";
import { apiV2, Website } from '@/api/website-api-v2';

interface AddWebsiteProps {
  onWebsiteAdded?: (website: Website) => void;
  onCancel?: () => void;
}

export const AddWebsite: React.FC<AddWebsiteProps> = ({ 
  onWebsiteAdded, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    type: 'primary' as 'primary' | 'competitor'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const normalizeUrl = (url: string): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const extractDomainName = (url: string): string => {
    try {
      const parsedUrl = new URL(normalizeUrl(url));
      return parsedUrl.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const normalizedUrl = normalizeUrl(formData.url);
    
    if (!validateUrl(normalizedUrl)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    if (!formData.name.trim()) {
      setError('Please enter a website name');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const website = await apiV2.websites.create({
        url: normalizedUrl,
        name: formData.name.trim(),
        type: formData.type
      });

      setSuccess(true);
      
      // Reset form after brief delay
      setTimeout(() => {
        setFormData({ url: '', name: '', type: 'primary' });
        setSuccess(false);
        onWebsiteAdded?.(website);
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add website');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setFormData(prev => ({ 
      ...prev, 
      url,
      // Auto-generate name from domain if name is empty
      name: prev.name || extractDomainName(url)
    }));
  };

  const isFormValid = formData.url.trim() && formData.name.trim() && !isSubmitting;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Add Website</h2>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="border-gray-600">
            Cancel
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-indigo-400" />
              Website Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium text-gray-300">
                  Website URL *
                </label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-400">
                  Enter the full URL including http:// or https://
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Display Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="My Website"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-400">
                  A friendly name to identify this website
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Website Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => 
                    setFormData(prev => ({ ...prev, type: e.target.value as 'primary' | 'competitor' }))
                  }
                  disabled={isSubmitting}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 disabled:opacity-50"
                >
                  <option value="primary">Primary Website</option>
                  <option value="competitor">Competitor Website</option>
                </select>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={formData.type === 'primary' ? 'default' : 'secondary'}
                    className={formData.type === 'primary' ? 'bg-indigo-600' : 'bg-gray-600'}
                  >
                    {formData.type === 'primary' ? 'Primary' : 'Competitor'}
                  </Badge>
                  <p className="text-xs text-gray-400">
                    {formData.type === 'primary' 
                      ? 'Your own website to monitor and improve'
                      : 'A competitor website to analyze and compare against'
                    }
                  </p>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/50 rounded text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Website added successfully!</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding Website...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Website
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-400" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-white">Website Added</h4>
                  <p className="text-sm text-gray-400">
                    Your website will be added to your monitoring dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-white">Start Initial Scan</h4>
                  <p className="text-sm text-gray-400">
                    You can immediately start your first SEO scan to analyze the website
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-white">View Results</h4>
                  <p className="text-sm text-gray-400">
                    Get detailed SEO reports, competitor comparisons, and improvement recommendations
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-900/20 border border-blue-500/50 rounded">
              <h4 className="font-medium text-blue-400 mb-2">Pro Tips</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Add your main website as Primary first</li>
                <li>• Add competitor websites to compare performance</li>
                <li>• Regular scans help track SEO improvements over time</li>
                <li>• Use meaningful names to easily identify websites</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 