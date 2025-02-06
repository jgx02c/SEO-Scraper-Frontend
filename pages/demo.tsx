import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "./demo.module.scss";

//For Microphone Socket
import { LOCAL_IP_ADDRESS } from '@/app/constants';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';

//Sections
import { Info } from '@/components/User/Info';
import { LiveTranscription } from '@/components/LiveTranscription/LiveTranscription';
import { InsightView } from '@/components/Insights/InsightView';

//IP 
import { WordScript } from '@/components/WordScript/WordScript';

interface MainProps {
    className?: string;
}

export const Demo: React.FC<MainProps> = ({ className }) => {

    const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
    const [selectedDeviceBitRate, setSelectedDeviceBitRate] = useState<string>('')

    const [socket, setSocket] = useState<Socket | null>(null);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

    //establish websocket connection
    useEffect(() => {
        // Ensure the correct URL and transport options
        const newSocket = io(`${LOCAL_IP_ADDRESS}`, { transports: ['websocket'] });
        console.log("WebSocket connection established.");

        // Set the socket instance in the state
        setSocket(newSocket);

        // Clean up function to close the WebSocket connection when the component unmounts
        return () => {
            newSocket.close();
            console.log("WebSocket connection closed.");
        };
    }, []); // Empty dependency array means this effect runs only once


      //used to get the microphone access
      useEffect(() => {
        const requestMicrophoneAccess = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                navigator.mediaDevices.enumerateDevices()
                    .then(devices => {
                        const audioDevices = devices.filter(device => device.kind === 'audioinput');
                        setAudioInputDevices(audioDevices);
                        if (audioDevices.length > 0) {
                            setSelectedDeviceId(audioDevices[0].deviceId);
                        }
                    })
                    .catch(error => console.error('Error enumerating devices:', error));
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };
        requestMicrophoneAccess();
    }, []);


    useEffect(() => {
        const updateBitRate = async () => {
            if (!selectedDeviceId) return;

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined } 
                });

                const audioTrack = stream.getAudioTracks()[0];
                const settings = audioTrack.getSettings();

                if (settings.sampleRate) {
                    setSelectedDeviceBitRate(`${settings.sampleRate}`); // Set bit rate as sample rate in Hz
                    console.log(`${settings.sampleRate} Hz`)
                }
            } catch (error) {
                console.error('Error getting bit rate:', error);
            }
        };

        updateBitRate();
    }, [selectedDeviceId]);

//setup audio stream

useEffect(() => {
    const setupAudioStream = async () => {
        try {
            if (!selectedDeviceId) return; // Ensure there's a selected device ID

            // Request access to the microphone using the selected device ID
            const constraints = { audio: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined } };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            // Set up the audio context with a desired sample rate
            const audioContext = new AudioContext({
                sampleRate: 16000 // Adjust this value to match your server's requirements
            });

            const source = audioContext.createMediaStreamSource(stream);
            const processor = audioContext.createScriptProcessor(4096, 1, 1); // Buffer size of 4096 samples

            let chunks: Int16Array[] = []; // Specify the type explicitly
            let nextTime = 0;

            processor.onaudioprocess = function (e) {
                const input = e.inputBuffer.getChannelData(0);
                const buffer = new Int16Array(input.map(n => Math.floor(n * 32767)));
                chunks.push(buffer);
            
                let currentTime = audioContext.currentTime;
            
                if (currentTime > nextTime) {
                    nextTime += 0.25; // Adjust timing as needed
            
                    if (socket && socket.connected) {
                        // Calculate the total length of all chunks
                        const totalLength = chunks.reduce((acc, val) => acc + val.length, 0);
                        // Create a new Int16Array to hold all data
                        const combined = new Int16Array(totalLength);
                       
                        // Copy each chunk to the combined array
                        let offset = 0;
                        for (let chunk of chunks) {
                            combined.set(chunk, offset);
                            offset += chunk.length;
                        }
            
                        // Send first 4000 samples or the entire array if smaller
                        socket.emit('audio', combined.slice(0, Math.min(4000, combined.length)));
                        // Keep the remaining samples
                        chunks = [new Int16Array(combined.slice(4000))];
                    }
                }
            };
            
            source.connect(processor);
            processor.connect(audioContext.destination);
            setAudioStream(stream);
            setAudioContext(audioContext);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    setupAudioStream();

    return () => {
        // Stop the audio stream
        audioStream?.getTracks().forEach(track => track.stop());
        // Close the audio context
        audioContext?.close();
    };
}, [selectedDeviceId, socket]); // Depend on selectedDeviceId and socket

return( 
    <div className={classNames(styles.root)}>
        <div className={styles.divMain}>
            <div className={styles.divLeft}>
            <div className={styles.divUpperLeft}>
                <Info selectedDeviceBitRate={selectedDeviceBitRate} audioInputDevices={audioInputDevices} selectedDeviceId={selectedDeviceId} setSelectedDeviceId={setSelectedDeviceId}/>
                </div>
                    <div className={styles.divMidLeft}>
                        <LiveTranscription />
                    </div>

                    <div className={styles.divBottomLeft}>
                        <WordScript />
                    </div>
            </div>
            <div className={styles.divRight}>
                <InsightView />
            </div>
        </div>
    </div>
 );
}

export default Demo;
