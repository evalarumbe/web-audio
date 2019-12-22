window.onload = () => {
    // create audio context
    const ctx = new AudioContext();
    // const context = new (window.AudioContext || window.webkitAudioContext)(); // TODO: if not working on Safari, try this

    // create and configure oscillator source
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 440;
    
    oscillator.start();
    
    
    const play = () => {
        // create and configure gain node
        const gain = ctx.createGain();
        
        // begin managing time
        // const now = ctx.currentTime;

        // // manage volume
        // gain.gain.setValueAtTime(1, now);
        // gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

        // chain everything
        oscillator.connect(gain);
        gain.connect(ctx.destination);
    };

    const playTinFuzz = () => {
        // create and configure gain node
        const gain = ctx.createGain();
        
        // begin managing time
        const now = ctx.currentTime;

        // manage volume
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

        // chain everything
        oscillator.connect(gain);
        gain.connect(ctx.destination);
    };

    // Controls
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

    // Experiments
    document.querySelector('#tin-fuzz').addEventListener('click', () => {
        ctx.resume().then(() => {
            playTinFuzz();
            console.log('Played tin fuzz');
        });
    });
};
