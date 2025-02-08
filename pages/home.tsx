import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { CompanyGrid } from "@/components/Companies/companies";
import { ChatTab } from "@/components/Chat/chat";
import { MyBusiness } from "@/components/MyBusiness/mybusiness";
import { Company } from "@/components/Company/company";
import CompanyProps from "@/types";

interface MainProps {
  className?: string;
}

export const Home: React.FC<MainProps> = ({ className }) => {
  const [activeComponent, setActiveComponent] = useState<
    "My_Business" | "Competitors" | "Settings" | "Chat" | "Company"
  >("Chat");

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null); // Store only company ID
  const [companyDetails, setCompanyDetails] = useState<CompanyProps | null>(null); // Store company details

  // Fetch company details by ID
  const fetchCompanyById = async (companyId: string) => {
    try {
      const response = await fetch(`/api/companies/${companyId}`);
      const data: CompanyProps = await response.json();
      setCompanyDetails(data); // Set company details after fetch
    } catch (error) {
      console.error("Failed to fetch company details:", error);
    }
  };

  // When selectedCompany changes, fetch the corresponding company details
  useEffect(() => {
    if (selectedCompany) {
      fetchCompanyById(selectedCompany);
    }
  }, [selectedCompany]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Chat":
        return <ChatTab />;
      case "Company":
        return companyDetails ? <Company selectedCompany={companyDetails} /> : <div>Loading...</div>;
      case "Competitors":
        return <CompanyGrid setSelectedCompany={setSelectedCompany} />;
      case "My_Business":
        return <MyBusiness />;
      default:
        return null;
    }
  };

  return (
    <div className={classNames(styles.root)}>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          <li
            className={activeComponent === "Chat" ? styles.activeTab : ""}
            onClick={() => {
              setActiveComponent("Chat");
              setSelectedCompany(null);
            }}
          >
            Chat
          </li>
          <li
            className={activeComponent === "Competitors" ? styles.activeTab : ""}
            onClick={() => {
              setActiveComponent("Competitors");
              setSelectedCompany(null);
            }}
          >
            Competitors
          </li>
          <li
            className={activeComponent === "My_Business" ? styles.activeTab : ""}
            onClick={() => {
              setActiveComponent("My_Business");
              setSelectedCompany(null);
            }}
          >
            My Business
          </li>
        </ul>
      </div>
      <div className={styles.mainContent}>{renderComponent()}</div>
    </div>
  );
};

export default Home;
