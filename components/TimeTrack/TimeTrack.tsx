import React, { useState } from 'react';
import styles from './TimeTrack.module.scss';

export interface TimeTrackProps {
    className?: string;
}
export const TimeTrack: React.FC<TimeTrackProps> = ({ className }) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <div className={styles.timeTrackContainer}>
            <h1 className={styles.scriptHeading}>
                Read the example script to follow for Demo.
                <br />
                Press "Start Transcription" to begin.
            </h1>
            <p className={styles.scriptText}>
            Demo Test Script

Press "Start Transcription" to begin.

Case: Smith v. XYZ Corporation
Date: October 10, 2024
Location: Law Offices of Johnson & Associates, 123 Main Street, Anytown, USA
Time: 10:00 AM

Present:

Mr. John Smith - Plaintiff
Mr. David Johnson - Plaintiff's Attorney
Ms. Rachel Green - Witness
Ms. Amanda Davis - Court Reporter


David Johnson: Good morning, Ms. Green. Thank you for being here today. Your testimony is crucial to this case. To begin, could you please state your full name for the record?

Rachel Green: Good morning. My name is Rachel Green, and I am a resident of Anytown, USA.

David Johnson: Thank you, Ms. Green. Were you present at the time of the incident involving Mr. John Smith and the XYZ Corporation?

Rachel Green: Yes, I was present at the scene.

David Johnson: Can you please describe in detail what you observed on the day of the incident?

Rachel Green: Certainly. I witnessed Mr. Smith attempting to cross the street at the designated crosswalk. As he entered the intersection, the XYZ Corporation's delivery truck approached rapidly from the right. I noticed Mr. Smith looked both ways before stepping off the curb, demonstrating due caution.

David Johnson: Thank you for that description, Ms. Green. For clarity, would you elaborate on the behavior of Mr. Smith just prior to the incident?

Rachel Green: Yes, of course. As Mr. Smith reached the middle of the crosswalk, he appeared vigilant and aware of his surroundings. He made eye contact with the drivers waiting at the stoplight, indicating he was attentive to the traffic conditions.

David Johnson: I appreciate your detailed observation, Ms. Green. Now, I would like to refer to Exhibit A, which is a transcript of the live feed recording from the day of the incident. Could you please read the highlighted sentence?

Rachel Green: Certainly. The highlighted sentence reads, "The pedestrian seemed to be crossing the street without paying attention to oncoming traffic."

David Johnson: Ms. Green, does this statement accurately reflect what you observed?

Rachel Green: Actually, no. As I mentioned earlier, Mr. Smith was alert and took all necessary precautions before crossing. This statement does not accurately capture the reality of the situation.

David Johnson: Thank you for clarifying that important point, Ms. Green. No further questions from me at this time.

[Mr. Johnson sits down, and Ms. Green looks expectantly at the Defendant's attorney, who begins his questioning.]

Defendant's Attorney: Good morning, Ms. Green. I appreciate your presence here today. I just have a few questions for you regarding your observations. Can you tell me how far away you were from the intersection when the accident occurred?

Rachel Green: I was standing on the corner, approximately 20 feet away from the crosswalk.

Defendant's Attorney: And did you have a clear view of the intersection during the incident?

Rachel Green: Yes, I had an unobstructed line of sight to the area where Mr. Smith was crossing the street.

Defendant's Attorney: Thank you, Ms. Green. Were there any distractions or obstacles that might have affected your view at the time of the incident?

Rachel Green: No, there were no distractions. The street was relatively clear, and I was focused on the situation unfolding in front of me.

Defendant's Attorney: Thank you for your honesty, Ms. Green. Were there any other pedestrians in the area that you noticed during this time?

Rachel Green: Yes, there were a few other pedestrians, but they were further down the street, waiting for the light to change. None of them were close to Mr. Smith at the moment of the accident.

Defendant's Attorney: That’s helpful to know. Thank you for your cooperation, Ms. Green. No further questions from me.

[The deposition concludes, and Ms. Amanda Davis prepares to close the record.]

Amanda Davis: This concludes the deposition of Ms. Rachel Green. The time is now 10:30 AM. Thank you all for your participation
            </p>
        </div>
    );
};
