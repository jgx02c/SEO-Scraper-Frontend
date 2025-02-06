import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './MainSettings.module.scss';
import { useIP } from '@/app/IPProvider';
import { DEFAULT_IP_ADDRESS, LOCAL_IP_ADDRESS } from '@/app/constants';

interface MainSettingProps {
    className?: string;
    onClose: () => void;
    defaultQuery: string; // New prop for default query
    defaultChunkRate: number; // New prop for default chunk rate
    defaultLLM: string; // New prop for default LLM
    defaultRAG: string; // New prop for default RAG
    onSaveSettings: (newIp: string, newQuery: string, newChunkRate: number, newRAG: string, newLLM: string) => void; // Updated callback prop
}

export const MainSetting: React.FC<MainSettingProps> = ({
    className,
    onClose,
    defaultQuery,
    defaultChunkRate,
    onSaveSettings,
    defaultLLM,
    defaultRAG,
}) => {
    const { ipAddress: defaultIPAddress, setIpAddress } = useIP();
    const [newIP, setNewIP] = useState(defaultIPAddress.split(':')[0]);
    const [usePort, setUsePort] = useState(defaultIPAddress.includes(':'));
    const [port, setPort] = useState(defaultIPAddress.split(':')[1] || '');

    const [query, setQuery] = useState(defaultQuery);
    const [chunkRate, setChunkRate] = useState(defaultChunkRate);
    const [llmOption, setLlmOption] = useState(defaultLLM);
    const [ragOption, setRagOption] = useState(defaultRAG);

    const handleIPChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNewIP(event.target.value);
    };

    const handlePortToggle = () => {
        setUsePort(prevState => !prevState);
        if (!usePort) {
            setPort('');
        }
    };

    const handlePortChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPort(event.target.value);
    };

    const handleQueryChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setQuery(event.target.value);
    };

    const handleChunkRateChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setChunkRate(value);
        }
    };

    const handleSave = () => {
        let finalIP = newIP;
        if (usePort && port.trim() !== '') {
            finalIP += `:${port}`;
        }
    
        setIpAddress(finalIP);
    
        // Call the callback with the updated values
        onSaveSettings(finalIP, query, chunkRate, ragOption, llmOption); // Ensure the order matches the callback signature
    
        onClose();
    };
    

    const handleReset = () => {
        setIpAddress(DEFAULT_IP_ADDRESS || LOCAL_IP_ADDRESS);
        setNewIP(DEFAULT_IP_ADDRESS.split(':')[0]);
        setPort('');
        setUsePort(false); // Reset the port toggle
        setQuery(defaultQuery);
        setChunkRate(defaultChunkRate);
        setLlmOption(defaultLLM); // Reset to default LLM option
        setRagOption(defaultRAG); // Reset to default RAG option
        onClose();
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <h4>Server Address</h4>
                        <div className={styles.divIp}>
                            <input
                                className={styles.inputIp}
                                type="text"
                                value={newIP}
                                onChange={handleIPChange}
                                placeholder="API Server IP Address"
                            />
                            <label>
                                <input
                                    className={styles.inputCheckBox}
                                    type="checkbox"
                                    checked={usePort}
                                    onChange={handlePortToggle}
                                />
                                Include Port
                            </label>
                            {usePort && (
                                <input
                                    className={styles.inputPort}
                                    type="text"
                                    value={port}
                                    onChange={handlePortChange}
                                    placeholder="Port Number"
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.topRight}>
                        <button type="button" className={styles.button} onClick={onClose}>Close</button>
                    </div>
                </div>

                <h4>Enter Query</h4>
                <textarea
                    className={styles.inputQuery}
                    value={''}
                    onChange={handleQueryChange}
                    placeholder="Enter Query"
                />

                <div className={styles.bottom}>
                    <div>
                        <h4>Transcription Chunk Rate</h4>
                        <input
                            className={styles.inputChunkRate}
                            type="number"
                            value={chunkRate}
                            onChange={handleChunkRateChange}
                            placeholder="Chunk Rate"
                        />
                    </div>

                    <div>
                        <h4>LLM Model</h4>
                        <select
                            id="llm-select"
                            value={llmOption}
                            onChange={(e) => setLlmOption(e.target.value)}
                        >
                            <option value="GPT-4o">GPT-4o</option>
                            <option value="GPT-4">GPT-4</option>
                        </select>
                    </div>

                    <div>
                        <h4>RAG Model</h4>
                        <select
                            id="rag-select"
                            value={ragOption}
                            onChange={(e) => setRagOption(e.target.value)}
                        >
                            <option value="LangChain">LangChain</option>
                           
                        </select>
                    </div>

                    <div className={styles.buttonsWrapper}>
                        <button type="button" className={styles.button} onClick={handleSave}>Save</button>
                        <button type="button" className={styles.button} onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
