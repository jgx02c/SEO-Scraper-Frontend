import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";

interface BusinessDetails {
  _id: string;
  name: string;
  description: string;
  contact_information?: {
    address?: string;
    email?: string;
    phone?: string;
  };
  benefits?: string[];
  products?: { name: string; description: string; url: string }[];
  customer_reviews?: { name: string; comment: string; location: string }[];
  promotions?: { title: string; discount: string; details: string }[];
  social_media?: { platform: string; url: string }[];
  website?: string;
}

const BusinessDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get business_id from URL
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(`https://leaps-scraper.onrender.com/get_business_by_id/${id}`);
        const result = await response.json();
        setBusiness(result.data);
      } catch (error) {
        console.error("Error fetching business details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <Button className="bg-blue-600 text-white" onClick={() => router.push("/business")}>
          Back to Businesses
        </Button>
        <h1 className="text-2xl font-bold">Business Details</h1>
      </div>

      {loading ? (
        <p className="text-center">Loading business details...</p>
      ) : business ? (
        <Card className="bg-gray-800 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Business Name & Description */}
            <div>
              <h2 className="text-3xl font-bold">{business.name}</h2>
              <p className="text-gray-400 mt-2">{business.description}</p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p>{business.contact_information?.address || "No Address Available"}</p>
              <p>{business.contact_information?.email || "No Email Available"}</p>
              <p>{business.contact_information?.phone || "No Phone Available"}</p>
            </div>

            {/* Benefits */}
            {business.benefits && (
              <div>
                <h3 className="text-xl font-semibold">Benefits</h3>
                <ul className="list-disc list-inside text-gray-400">
                  {business.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Products */}
            {business.products && (
              <div>
                <h3 className="text-xl font-semibold">Products</h3>
                <ul className="space-y-3">
                  {business.products.map((product, index) => (
                    <li key={index} className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-gray-300">{product.description}</p>
                      <a
                        href={product.url}
                        target="_blank"
                        className="text-blue-400 hover:underline"
                      >
                        View Product
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Promotions */}
            {business.promotions && (
              <div>
                <h3 className="text-xl font-semibold">Promotions</h3>
                {business.promotions.map((promo, index) => (
                  <div key={index} className="p-3 bg-green-700 rounded-lg">
                    <h4 className="font-semibold">{promo.title}</h4>
                    <p className="text-gray-300">{promo.discount}</p>
                    <p className="text-sm">{promo.details}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Customer Reviews */}
            {business.customer_reviews && (
              <div>
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                {business.customer_reviews.map((review, index) => (
                  <div key={index} className="p-3 bg-gray-700 rounded-lg">
                    <p className="font-semibold">{review.name} ({review.location})</p>
                    <p className="text-gray-300">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Social Media Links */}
            {business.social_media && (
              <div>
                <h3 className="text-xl font-semibold">Social Media</h3>
                <div className="flex space-x-4">
                  {business.social_media.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      className="text-blue-400 hover:underline"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Website Link */}
            {business.website && (
              <div className="text-center">
                <a
                  href={business.website}
                  target="_blank"
                  className="text-blue-400 hover:underline text-lg font-semibold"
                >
                  Visit Website
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <p className="text-center">Business not found.</p>
      )}
    </div>
  );
};

export default BusinessDetailPage;
