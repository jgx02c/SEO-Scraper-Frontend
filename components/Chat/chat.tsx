import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "./chat.module.scss";
import io, { Socket } from 'socket.io-client';

import { InsightExpanded } from '@/components/Insights/InsightExpanded';
import { Insight } from '@/components/Insights/Insight';

// Import the types
import { InsightDataType } from '@/types/types';

// For Microphone Socket
import { LOCAL_IP_ADDRESS } from '@/app/constants';

interface InsightViewProps {
    className?: string;
}

export const ChatTab: React.FC<InsightViewProps> = ({ className }) => {
    const [insights, setInsights] = useState<InsightDataType[]>([]);
    const [activeInsightId, setActiveInsightId] = useState<number | null>(null);
    const [isInsightOpened, setInsightOpened] = useState<InsightDataType | null>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(`${LOCAL_IP_ADDRESS}`, { transports: ['websocket'] });
        setSocket(socketInstance);

        socketInstance.on('insight_start', () => {
            const newInsightId = Date.now();
            setActiveInsightId(newInsightId);
            setInsights(prevInsights => [...prevInsights, {
                id: newInsightId,
                text: '',
                isComplete: false
            }]);
        });

        socketInstance.on('insight_data', (data: { text: string }) => {
            //console.log("Received insight data chunk:", data.text);
            if (activeInsightId !== null) {
                setInsights(prevInsights => prevInsights.map(insight => 
                    insight.id === activeInsightId
                        ? { ...insight, text: insight.text + data.text }
                        : insight
                ));
            }
        });

        socketInstance.on('insight_finished', () => {
            //console.log("Insight generation finished");
            if (activeInsightId !== null) {
                setInsights(prevInsights => prevInsights.map(insight => 
                    insight.id === activeInsightId
                        ? { ...insight, isComplete: true }
                        : insight
                ));
                setActiveInsightId(null);
            }
        });

        socketInstance.on('connect_error', (err: Error) => {
            setError(err.message);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [activeInsightId]);

    const handleInsightClicked = (insight: InsightDataType) => {
        setInsightOpened(insight);
    };

    const handleCloseInsight = () => {
        setInsightOpened(null);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (socket && message.trim()) {
            // Emit the message to the server via socket
            socket.emit('send_message', message);
    
            // Send POST request to the backend
            try {
                const response = await fetch(`${LOCAL_IP_ADDRESS}/generate_insight`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',  // Set content type to text/plain
                    },
                    body: message,  // Send the raw message as body
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const responseData = await response.text();  // Expect plain text response
                //console.log('Response from server:', responseData);
                setMessage(''); // Clear input field after sending
            } catch (error) {
                console.error('Error sending message:', error);
                setError('Failed to send message. Please try again.');
            }
        }
    };

    return (
        <div className={classNames(styles.insightViewContainer, className)}>
            <div className={styles.headerContainer}>
                <h5 className={styles.headerText}>Data</h5>
            </div>
            <div className={styles.insightListContainer}>
                {insights.map((insight) => (
                    <div 
                        key={insight.id} 
                        className={classNames(
                            styles.insightItem,
                            !insight.isComplete && styles.activeInsight
                        )}
                        onClick={() => handleInsightClicked(insight)}
                    >
                        <Insight insight={insight} />
                    </div>
                ))}
            </div>
            <div className={styles.inputSection}>
                <span className={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Type your message"
                        value={message}
                        onChange={handleMessageChange}
                        className={styles.inputField}
                    />
                    <button className={styles.submitButton} onClick={handleSendMessage}>
                        Go
                    </button>
                </span>
            </div>
            {isInsightOpened && (
                <div className={styles.modalOverlay}>
                    <InsightExpanded onClose={handleCloseInsight} insight={isInsightOpened} />
                </div>
            )}
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};
