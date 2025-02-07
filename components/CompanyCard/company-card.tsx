import React, { useState } from "react";
import Image from "next/image";
import styles from "./company-card.module.scss";
import dummyCompanies from "@/dummyData";
import Modal from "react-modal";

interface CompanyCardProps {
  name: string;
  logo: string;
  description: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  logo,
  description,
}) => {
  const [selectedCompany, setSelectedCompany] =
    useState<CompanyCardProps | null>(null);

  const handleCardClick = (companyName: string) => {
    const company = dummyCompanies.find((c) => c.name === companyName);
    if (company) {
      setSelectedCompany(company);
    }
  };

  return (
    <>
      <div className={styles.card} onClick={() => handleCardClick(name)}>
        <Image src={logo} alt={name} width={50} height={50} />
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

      <Modal
        isOpen={!!selectedCompany}
        onRequestClose={() => setSelectedCompany(null)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {selectedCompany && (
          <div className={styles.popupContent}>
            <Image
              src={selectedCompany.logo}
              alt={selectedCompany.name}
              width={100}
              height={100}
            />
            <h2>{selectedCompany.name}</h2>
            <p>{selectedCompany.description}</p>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setSelectedCompany(null)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

// Real data

// export const CompanyCard: React.FC<CompanyCardProps> = ({
//   name,
//   logo,
//   description,
// }) => {
//   const [fullScreenData, setFullScreenData] = useState<CompanyCardProps | null>(
//     null
//   );

//   const fetchCompanyDetails = async () => {
//     try {
//       const response = await fetch(
//         `/api/company?name=${encodeURIComponent(name)}`
//       );
//       const data = await response.json();
//       setFullScreenData(data);
//     } catch (error) {
//       console.error("Error fetching company details:", error);
//     }
//   };

//   return (
//     <>
//       <div className={styles.card} onClick={fetchCompanyDetails}>
//         <Image src={logo} alt={name} width={50} height={50} />
//         <h3>{name}</h3>
//         <p>{description}</p>
//       </div>

//       {fullScreenData && (
//         <div
//           className={styles.fullScreenOverlay}
//           onClick={() => setFullScreenData(null)}
//         >
//           <div className={styles.fullScreenContent}>
//             <Image
//               src={fullScreenData.logo}
//               alt={fullScreenData.name}
//               width={100}
//               height={100}
//             />
//             <h2>{fullScreenData.name}</h2>
//             <p>{fullScreenData.description}</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
