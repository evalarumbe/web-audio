window.onload = () => {
    // Create audio context
    const ctx = new AudioContext();
    // const context = new (window.AudioContext || window.webkitAudioContext)(); // TODO: if not working on Safari, try this

    // Create oscillator node
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 440;
    oscillator.start();

    const play = () => {
        oscillator.connect(ctx.destination);
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
