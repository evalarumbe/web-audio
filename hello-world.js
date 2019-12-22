window.onload = () => {
    // create audio context
    const ctx = new AudioContext();
    // const context = new (window.AudioContext || window.webkitAudioContext)(); // TODO: if not working on Safari, try this

    // create and configure oscillator source
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 440;

    // begin managing time
    const now = ctx.currentTime;

    oscillator.start(now);

    // create and configure gain node
    const gain = ctx.createGain();

    const play = () => {
        // chain everything
        oscillator.connect(gain);
        gain.connect(ctx.destination);

        // manage volume
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

    };

    // UI Buttons
    document.querySelector('#play').addEventListener('click', () => {
        ctx.resume().then(() => {
            play();
            console.log('Playback resumed successfully');
        });
    });

    document.querySelector('#stop').addEventListener('click', () => {
        ctx.suspend().then(() => {
            console.log('Playback suspended successfully');
        });
    });
};
