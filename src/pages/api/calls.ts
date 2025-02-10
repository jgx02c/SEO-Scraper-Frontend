// Next.js API route support: https://nextjs.org/docs/api-routes/introduction// Ok so you need to add a config file for the URL base structure `{?urlConfig}/(call to be made)`
// When you call the "my business tab" it will call the same competitors function but with the business_id set to 1
// Slim down the fast api server to remove the BS that is there (extra nonsense not being used)

// Overview

//https://leaps-scraper.onrender.com/generate_insight
//https://leaps-scraper.onrender.com/get_pages_by_business_id/1
//https://leaps-scraper.onrender.com/get_page_by_id/1
//https://leaps-scraper.onrender.com/get_business_by_id/1
//https://leaps-scraper.onrender.com/get_all_businesses


//Websocket for Chat

// Calls to server to for Chat Bot Websocket.
// Look at the code for it to make it work.



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/companies/[companyId].ts
import { NextApiRequest, NextApiResponse } from "next";

const companiesData = [
  {
    id: "1",
    name: "Company A",
    logo: "/path/to/logoA.png",
    description: "Detailed description of Company A",
  },
  {
    id: "2",
    name: "Company B",
    logo: "/path/to/logoB.png",
    description: "Detailed description of Company B",
  },
  // Add other companies as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { companyId } = req.query;

  const company = companiesData.find((company) => company.id === companyId);

  if (company) {
    res.status(200).json(company); // Return the company details
  } else {
    res.status(404).json({ error: "Company not found" }); // Return error if company is not found
  }
}
