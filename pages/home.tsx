import Image from 'next/image';
import Profile from '@/public/dialogica_logo.png';
import Settings from '@/public/Settings.svg';
// import { Insight } from "@/components/insight/insight"
// import { InsightExpanded } from "@/components/insightexpanded/insightexpanded"
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "./index.module.scss";
// import { TimeTrack } from "@/components/timetrack/timetrack";
import { InsightDataType, TimeTrackDataType } from '@/types/types';
// import { MainSetting } from '@/components/mainsettings/mainsettings';

import { useIP } from '@/app/IPProvider';
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

  
return(
    <div className={classNames(styles.root)}>
        <NavHeader />
        <Main />
        
    </div>
 );
}

export default Home;