// Next.js API route support: https://nextjs.org/docs/api-routes/introduction// Ok so you need to add a config file for the URL base structure `{?urlConfig}/(call to be made)`
// When you call the "my business tab" it will call the same competitors function but with the business_id set to 1
// Slim down the fast api server to remove the BS that is there (extra nonsense not being used)

// Overview

// Call to server for get_business_by_id

// Call to server to get_all_business  


//Websocket for Chat

// Calls to server to for Chat Bot Websocket.
// Look at the code for it to make it work.



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
