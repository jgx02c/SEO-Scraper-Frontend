// components/tabs/OverviewTab.tsx
import { BusinessDetails } from "@/types";
import { ExtendedBusinessDetails } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, MapPin, Mail, Phone, Gift, Facebook } from "lucide-react";

interface OverviewTabProps {
  business: ExtendedBusinessDetails;
}

export const OverviewTab = ({ business }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-4">
          {business.name}
          {business.website && (
            <a 
              href={business.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              {business.website}
              <ExternalLink size={16} />
            </a>
          )}
        </h2>
        <p className="text-gray-400 mt-2">{business.description}</p>
      </div>

      {/* BBB Rating */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            BBB Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Rating:</strong> {business.additional_info.BBB_rating}</p>
          <p><strong>Accreditation:</strong> {business.additional_info.BBB_accreditation}</p>
          <p><strong>Reason:</strong> {business.additional_info.BBB_reason_for_rating}</p>
        </CardContent>
      </Card>

      {/* Contact Information */}
      {business.contact_information && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {business.contact_information.address && (
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {business.contact_information.address}
              </p>
            )}
            {business.contact_information.email && (
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {business.contact_information.email}
              </p>
            )}
            {business.contact_information.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {business.contact_information.phone}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Benefits */}
      {business.benefits && business.benefits.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {business.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-300">{benefit}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Products */}
      {business.products && business.products.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {business.products.map((product, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <p className="text-gray-400 mt-1">{product.description}</p>
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-flex items-center gap-1"
                  >
                    View Product
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Reviews */}
      {business.customer_reviews && business.customer_reviews.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {business.customer_reviews.map((review, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <p className="italic text-gray-300">"{review.comment}"</p>
                  <div className="mt-2 text-sm text-gray-400">
                    {review.name}, {review.age} • {review.location}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Promotions */}
      {business.promotions && business.promotions.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Current Promotions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {business.promotions.map((promo, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-lg text-blue-400">{promo.discount}</h4>
                <Badge variant="secondary">{promo.title}</Badge>
                <p className="text-gray-400">{promo.details}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Social Media */}
      {business.social_media && business.social_media.length > 0 && (
        <div className="flex gap-2">
          {business.social_media.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {social.platform === "Facebook" && <Facebook />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverviewTab;