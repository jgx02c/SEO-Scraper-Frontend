import React, { useState } from "react";
import styles from "./companies.module.scss";
import dummyCompanies from "@/dummyData";
import { CompanyCard } from "@/components/CompanyCard/company-card";
import CompanyProps from "@/types";

interface CompanyGridProps {
  setSelectedCompany: (companyId: string | null) => void; // Accept companyId (string) instead of company
}

const [companies, setCompanies] = useState<CompanyProps>(); // Store company details


// Fetch company details by ID
  const fetchCompanies = async (companyId: string) => {
    try {
      const response = await fetch(`/api/companies/${companyId}`);
      const data: CompanyProps = await response.json();
      setCompanies(data); // Set company details after fetch
    } catch (error) {
      console.error("Failed to fetch company details:", error);
    }
  };

export const CompanyGrid: React.FC<CompanyGridProps> = ({ setSelectedCompany }) => {
  return (
    <div className={styles.grid}>
      {dummyCompanies.map((company) => (
        <CompanyCard
          key={company.id} // Using company.id as the unique key
          name={company.name}
          logo={company.logo}
          id={company.id}
          description={company.description}
          setSelectedCompany={setSelectedCompany} // Pass setSelectedCompany down
        />
      ))}
    </div>
  );
};
