window.onload = () => {
    // Create audio context
    const context = new AudioContext();
    // const context = new (window.AudioContext || window.webkitAudioContext)(); // TODO: if not working on Safari, try this

    // UI Buttons
    document.querySelector('#play').addEventListener('click', () => {
        context.resume().then(() => {
            console.log('Playback resumed successfully');
        });
    });

    document.querySelector('#stop').addEventListener('click', () => {
        context.suspend().then(() => {
            console.log('Playback suspended successfully');
        });
    });

    // Create oscillator node

    var oscillator = context.createOscillator();

    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 440;
    oscillator.connect(context.destination);
    oscillator.start();


};
