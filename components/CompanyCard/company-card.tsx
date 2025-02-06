import Image from 'next/image';
import styles from './company-card.module.scss';

interface CompanyCardProps {
  name: string;
  logo: string;
  description: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ name, logo, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={logo} alt={`${name} Logo`} width={80} height={80} className={styles.logo} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
