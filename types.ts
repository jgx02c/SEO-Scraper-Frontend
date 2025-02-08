export default interface WebPageProps {
    id: string;
    name: string;
    url: string;
    description: string;
    data: string;
    logo: string;
  }

export default interface CompanyProps {
    id: string;
    name: string;
    logo: string;
    description: string;
    websitePages: WebPageProps[]; // Array of webpage objects for the company
}