import React, { useState } from 'react';
import styles from './WordScript.module.scss';

export interface WordScriptProps {
    className?: string;
}

export const WordScript: React.FC<WordScriptProps> = ({ className }) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <div className={`${styles.timeTrackContainer} ${className}`}>
            <h1 className={styles.scriptHeading}>
                Read the example script to follow for Demo.
                <br />
                Press "Start Transcription" to begin.
            </h1>
            <p className={styles.scriptText}>
                <strong>Demo Test Script</strong>
                <br />
                Press "Start Transcription" to begin.
                <br />
                <br />
                <strong>Case:</strong> Smith v. XYZ Corporation
                <br />
                <strong>Date:</strong> October 10, 2024
                <br />
                <strong>Location:</strong> Law Offices of Johnson & Associates, 123 Main Street, Anytown, USA
                <br />
                <strong>Time:</strong> 10:00 AM
                <br />
                <br />
                <strong>Present:</strong>
                <br />
                Mr. John Smith - Plaintiff
                <br />
                Mr. David Johnson - Plaintiff's Attorney
                <br />
                Ms. Rachel Green - Witness
                <br />
                Ms. Amanda Davis - Court Reporter
                <br />
                <br />
                <strong>David Johnson:</strong> Good morning, Ms. Green. Thank you for being here today. Your testimony is crucial to this case. To begin, could you please state your full name for the record?
                <br />
                <strong>Rachel Green:</strong> Good morning. My name is Rachel Green, and I am a resident of Anytown, USA.
                <br />
                <strong>David Johnson:</strong> Thank you, Ms. Green. Were you present at the time of the incident involving Mr. John Smith and the XYZ Corporation?
                <br />
                <strong>Rachel Green:</strong> Yes, I was present at the scene.
                <br />
                <strong>David Johnson:</strong> Can you please describe in detail what you observed on the day of the incident?
                <br />
                <strong>Rachel Green:</strong> Certainly. I witnessed Mr. Smith attempting to cross the street at the designated crosswalk. As he entered the intersection, the XYZ Corporation's delivery truck approached rapidly from the right. I noticed Mr. Smith looked both ways before stepping off the curb, demonstrating due caution.
                <br />
                <strong>David Johnson:</strong> Thank you for that description, Ms. Green. For clarity, would you elaborate on the behavior of Mr. Smith just prior to the incident?
                <br />
                <strong>Rachel Green:</strong> Yes, of course. As Mr. Smith reached the middle of the crosswalk, he appeared vigilant and aware of his surroundings. He made eye contact with the drivers waiting at the stoplight, indicating he was attentive to the traffic conditions.
                <br />
                <strong>David Johnson:</strong> I appreciate your detailed observation, Ms. Green. Now, I would like to refer to Exhibit A, which is a transcript of the live feed recording from the day of the incident. Could you please read the highlighted sentence?
                <br />
                <strong>Rachel Green:</strong> Certainly. The highlighted sentence reads, "The pedestrian seemed to be crossing the street without paying attention to oncoming traffic."
                <br />
                <strong>David Johnson:</strong> Ms. Green, does this statement accurately reflect what you observed?
                <br />
                <strong>Rachel Green:</strong> Actually, no. As I mentioned earlier, Mr. Smith was alert and took all necessary precautions before crossing. This statement does not accurately capture the reality of the situation.
                <br />
                <strong>David Johnson:</strong> Thank you for clarifying that important point, Ms. Green. No further questions from me at this time.
                <br />
                <br />
                [Mr. Johnson sits down, and Ms. Green looks expectantly at the Defendant's attorney, who begins his questioning.]
                <br />
                <strong>Defendant's Attorney:</strong> Good morning, Ms. Green. I appreciate your presence here today. I just have a few questions for you regarding your observations. Can you tell me how far away you were from the intersection when the accident occurred?
                <br />
                <strong>Rachel Green:</strong> I was standing on the corner, approximately 20 feet away from the crosswalk.
                <br />
                <strong>Defendant's Attorney:</strong> And did you have a clear view of the intersection during the incident?
                <br />
                <strong>Rachel Green:</strong> Yes, I had an unobstructed line of sight to the area where Mr. Smith was crossing the street.
                <br />
                <strong>Defendant's Attorney:</strong> Thank you, Ms. Green. Were there any distractions or obstacles that might have affected your view at the time of the incident?
                <br />
                <strong>Rachel Green:</strong> No, there were no distractions. The street was relatively clear, and I was focused on the situation unfolding in front of me.
                <br />
                <strong>Defendant's Attorney:</strong> Thank you for your honesty, Ms. Green. Were there any other pedestrians in the area that you noticed during this time?
                <br />
                <strong>Rachel Green:</strong> Yes, there were a few other pedestrians, but they were further down the street, waiting for the light to change. None of them were close to Mr. Smith at the moment of the accident.
                <br />
                <strong>Defendant's Attorney:</strong> That’s helpful to know. Thank you for your cooperation, Ms. Green. No further questions from me.
                <br />
                <br />
                [The deposition concludes, and Ms. Amanda Davis prepares to close the record.]
                <br />
                <strong>Amanda Davis:</strong> This concludes the deposition of Ms. Rachel Green. The time is now 10:30 AM. Thank you all for your participation.
            </p>
        </div>
    );
};
