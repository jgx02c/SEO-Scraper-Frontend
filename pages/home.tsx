import Image from 'next/image';
import Profile from '@/public/dialogica_logo.png';
import Settings from '@/public/Settings.svg';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { NavHeader } from '@/webComponents/mainnav';
import { Main } from '@/webComponents/main';
import { Reputation } from '@/webComponents/reputation';
import { Featureone } from '@/webComponents/featureOne';
import { Featuretwo } from '@/webComponents/featureTwo';
import { Footer } from '@/webComponents/footer';
import { Join } from '@/webComponents/join';

interface MainProps {
    className?: string;
}

export const Home: React.FC<MainProps> = ({ className }) => {
    const [activeComponent, setActiveComponent] = useState<'myCompany' | 'companies' | 'addCompany' | 'chat'>('myCompany');
    
    const renderComponent = () => {
        switch (activeComponent) {
            case 'myCompany':
                return <Chat />;
            case 'companies':
                return <Companies />;
            case 'addCompany':
                return <MyCompany />;
            case 'chat':
                return <Settings />;
            default:
                return <Main />;
        }
    };
    
    return (
        <div className={classNames(styles.root)}>
            <div className={styles.sidebar}>
                <div className={styles.profileSection}>
                    <Image src={Profile} alt="Profile" width={50} height={50} />
                </div>
                <ul className={styles.menu}>
                    <li onClick={() => setActiveComponent('myCompany')}>My Company</li>
                    <li onClick={() => setActiveComponent('companies')}>Companies</li>
                    <li onClick={() => setActiveComponent('addCompany')}>Add Company</li>
                    <li onClick={() => setActiveComponent('chat')}>Chat</li>
                </ul>
            </div>
            <div className={styles.mainContent}>
                <NavHeader />
                {renderComponent()}
            </div>
        </div>
    );
}

export default Home;
