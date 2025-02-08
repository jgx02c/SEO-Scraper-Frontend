import React, { useState } from "react";
import Image from "next/image";
import styles from "./company.module.scss";
import Modal from "react-modal";
import dummyWebpages from "@/dummySites";
import WebPageProps from "@/types";
import CompanyProps from "@/types";



interface CompanyModalProps {
  selectedCompany: CompanyProps | null; // Single company object or null
}

export const Company: React.FC<CompanyModalProps> = ({ selectedCompany }) => {
  const [selectedWebPage, setSelectedWebPage] = useState<WebPageProps | null>(null);

  // Function to simulate fetching data based on webpage ID
  const fetchWebPageDetails = async (webPageId: string) => {
    // Here you would typically call your API to get the webpage details by ID
    const response = await fetch(`/api/webpages/${webPageId}`);
    const data = await response.json();
    return data;
  };

  const handleCardClick = async (webPageId: string) => {
    // Fetch webpage details when a webpage is clicked
    const webPageDetails = await fetchWebPageDetails(webPageId);
    setSelectedWebPage(webPageDetails);
  };

  return (
    <>
      {/* List View: Mapping over websitePages of the selected company */}
      <div className={styles.listView}>
        <h3>Web Pages</h3>
        <ul>
          {selectedCompany?.websitePages.map((page) => (
            <li key={page.id} onClick={() => handleCardClick(page.id)}>
              <Image src={page.logo} alt={page.name} width={30} height={30} />
              <span>{page.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for displaying the selected webpage */}
      <Modal
        isOpen={!!selectedWebPage}
        onRequestClose={() => setSelectedWebPage(null)} // Close modal when requested
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {selectedWebPage && (
          <div className={styles.popupContent}>
            <Image
              src={selectedWebPage.logo}
              alt={selectedWebPage.name}
              width={100}
              height={100}
            />
            <h2>{selectedWebPage.name}</h2>
            <p>{selectedWebPage.description}</p>
            <a href={selectedWebPage.url} target="_blank" rel="noopener noreferrer">
              Visit {selectedWebPage.name}
            </a>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setSelectedWebPage(null)} // Close the modal
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};
