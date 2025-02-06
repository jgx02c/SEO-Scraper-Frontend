import { useEffect, useState } from 'react';
import { CompanyCard } from '../CompanyCard/company-card';
import styles from './companies.module.scss';

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
}

export const CompanyGrid: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  return (
    <div className={styles.grid}>
      {companies.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  );
};
