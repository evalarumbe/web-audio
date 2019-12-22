(() => {
    // create audio context
    const ctx = new AudioContext();
    // const context = new (window.AudioContext || window.webkitAudioContext)(); // TODO: if not working on Safari, try this
    
    
    const play = () => {
        // create and configure oscillator source
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 250;

        // create and configure gain node
        const gain = ctx.createGain();
        
        // begin managing time
        const now = ctx.currentTime;

        // manage volume
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.03, now + 0.5)

        // chain everything
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
    };
    
    const playBuzz = () => {
        const now = ctx.currentTime;

        // create and configure oscillator source
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 440;

        // create and configure gain node
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

        // chain everything
        oscillator.connect(gain);
        gain.connect(ctx.destination);

        // once everything's plugged in, turn it on
        oscillator.start(0);
        oscillator.stop(now + 1);
        // oscillator.disconnect(0);
    };
    
    const playTinFuzz = () => {
        const now = ctx.currentTime;

        // create and configure oscillator source
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 440;

        // create and configure gain node
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

        // chain everything
        oscillator.connect(gain);
        gain.connect(ctx.destination);

        // once everything's plugged in, turn it on
        oscillator.start(0);
        oscillator.stop(now + 1);
        // oscillator.disconnect(1);
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
    document.querySelector('#buzz').addEventListener('click', () => {
        ctx.resume().then(() => {
            playBuzz();
            console.log('Played buzz');
        });
    });

    document.querySelector('#tin-fuzz').addEventListener('click', () => {
        ctx.resume().then(() => {
            playTinFuzz();
            console.log('Played tin fuzz');
        });
    });

    // Auto-play
    // With this running in live-server you can live-update frequencies, i.e. live-code music
    // document.querySelector('#play').dispatchEvent(new MouseEvent('click'));
})();
