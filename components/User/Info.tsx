import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Info.module.scss';
import { LOCAL_IP_ADDRESS } from '@/app/constants';
import Profile from '@/public/profile.png';
import Settings from '@/public/Settings.svg';
import dynamic from 'next/dynamic';
import { MainSetting } from './MainSettings';
import { SpeakerLabels } from './SpeakerLabels';

export interface InfoProps {
    className?: string;
    audioInputDevices: MediaDeviceInfo[];
    selectedDeviceId: string;
    setSelectedDeviceId: React.Dispatch<React.SetStateAction<string>>;
    selectedDeviceBitRate: string; // Passed in as a prop
}

export const Info: React.FC<InfoProps> = ({
    className,
    audioInputDevices,
    selectedDeviceId,
    setSelectedDeviceId,
    selectedDeviceBitRate, // Destructure selectedDeviceBitRate from props
}) => {
    const [serverOnline, setServerOnline] = useState<boolean>(true);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isMainSettingsOpen, setMainSettingsOpen] = useState<boolean>(false);
    const [isSpeakerLabelsOpen, setIsSpeakerLabelsOpen] = useState<boolean>(false);
    const [transcriptionStarted, setTranscriptionStarted] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // Add states for query, chunkRate, and IP
    const [query, setQuery] = useState<string>('Answer the question based only on the following context: {context} Cross reference the live-feed transcription with the data from the context. Produce any matching insights of conflisting information or confirmation of information, as well as follow up questions: {question}'); // Default query state
    const [chunkRate, setChunkRate] = useState<number>(5); 
    const [llm, setLLM] = useState<string>('GPT-4o'); 
    const [rag, setRAG] = useState<string>('LangChain');
    const [ip, setIp] = useState<string>(LOCAL_IP_ADDRESS); 

    // Save settings handler for updating query, chunkRate, and IP
    const handleSaveSettings = (newIp: string, newQuery: string, newChunkRate: number, newRAG: string, newLLM: string ) => {
        setIp(newIp);           // Update IP state (not used yet)
        setQuery(newQuery);     // Update query state
        setChunkRate(newChunkRate); // Update chunkRate state
        setRAG(newRAG)
        setLLM(newLLM)
    };

    // Modify the startTranscription function to send selectedDeviceBitRate, query, and chunkRate
    const startTranscription = async () => {
        try {
            const response = await fetch(`${ip}/start_transcription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'bit_rate':'16000', // Send bit rate or use 16000 as default
                    'query': query,        // Send query
                    'batch_size': chunkRate, // Send chunk rate
                    'selected_llm': llm, // Send chunk LLM
                    'selected_rag': rag, // Send chunk RAG
                }),
            });

            if (response.ok) setTranscriptionStarted(true);
        } catch (error) {
            console.error('Error starting transcription:', error);
        }
    };

    const stopTranscription = async () => {
        try {
            const response = await fetch(`${ip}/stop_transcription`, { method: 'POST' });
            if (response.ok) setTranscriptionStarted(false);
        } catch (error) {
            console.error('Error stopping transcription:', error);
        }
    };

    const handleMainSettingsToggle = () => {
        setMainSettingsOpen(prev => !prev);
    };

    const handleSpeakerLabelsToggle = () => {
        setIsSpeakerLabelsOpen(prev => !prev);
    };

    const handleClick = async () => {
        setTranscriptionStarted(prev => !prev);
        try {
            if (!transcriptionStarted) {
                setIsRecording(true);
                await startTranscription();
                const id = setInterval(() => {
                    setTimer(prev => prev + 1);
                }, 1000);
                setIntervalId(id);
            } else {
                setIsRecording(false);
                await stopTranscription();
                if (intervalId) {
                    clearInterval(intervalId);
                    setIntervalId(null);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.profile}>
                    <Image src={Profile} alt="Profile Image" className={styles.profilePicture} />
                    <h4 className={styles.profileName}>Dialogica</h4>
                    <button className={styles.settingsButton} onClick={handleMainSettingsToggle}>
                        <Image src={Settings} alt="Settings Icon" />
                    </button>
                </div>
                <div className={styles.microphoneSelectWrapper}>
                    <select
                        className={styles.microphoneSelect}
                        value={selectedDeviceId}
                        onChange={e => setSelectedDeviceId(e.target.value)}
                    >
                        <option value="">No Microphone Selected</option>
                        {audioInputDevices.map(device => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.middle}> 
                <div className={styles.statusWrapper}>
                    <div className={styles.statusDot} style={{ backgroundColor: serverOnline ? 'green' : 'red' }}/>
                    <span>
                        <h1>{serverOnline ? 'Server Online' : 'Server Offline'}</h1>
                    </span>
                </div>
                <button className={styles.speakerLabelsButton} onClick={handleSpeakerLabelsToggle}>
                    <h1>Speaker Labels</h1>
                </button>
            </div>

            <div className={styles.right}>
                <div className={styles.timer}>
                    <h1>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</h1>
                </div>
                <div className={styles.soundwaveDiv}></div>
                <button className={styles.transcriptionButton} onClick={handleClick}>
                    <h1>{transcriptionStarted ? 'Stop Transcription' : 'Start Transcription'}</h1>
                </button>
            </div>  

            {isMainSettingsOpen && (
                <div className={styles.modalOverlay}>
                    <MainSetting 
                        onClose={handleMainSettingsToggle}
                        onSaveSettings={handleSaveSettings} // Pass save handler to MainSetting
                        defaultQuery={query}
                        defaultChunkRate={chunkRate} 
                        defaultLLM={llm} 
                        defaultRAG={rag}                        
                    />
                </div>
            )}
            {isSpeakerLabelsOpen && (
                <div className={styles.modalOverlay}>
                    <SpeakerLabels 
                        onClose={handleSpeakerLabelsToggle} 
                    />
                </div>
            )} 
        </div>
    );
};
