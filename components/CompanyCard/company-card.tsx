import React, { useState } from "react";
import Image from "next/image";
import styles from "./company-card.module.scss";
import dummyCompanies from "@/dummyData";
import CompanyProps from "@/types";

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  description: string;
  setSelectedCompany: (companyId: string | null) => void; // Now expects companyId (string)
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  logo,
  description,
  setSelectedCompany, // destructuring setSelectedCompany here
}) => {

  const handleCardClick = () => {
    const company = dummyCompanies.find((c) => c.name === name);
    if (company) {
      setSelectedCompany(company.id); // Pass back only the company ID
    }
  };

  return (
    <div>
      <div className={styles.card} onClick={handleCardClick}>
        <Image src={logo} alt={name} width={50} height={50} />
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
