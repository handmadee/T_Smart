import Sound from 'react-native-sound';

export const PlaySound = (audioPath) => {
    console.log(audioPath);

    const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            sound.release();
        });
    });
};
