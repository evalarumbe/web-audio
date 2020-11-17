try {
  (() => {
    // create audio context
    const ctx = new AudioContext();
    // const context = new (window.AudioContext || window.webkitAudioContext)(); // TODO: if not working on Safari, try this
    
    // Recording state
    let recording = false;
    let currentNote = new Note();

    let recordedNotes = [];

    console.log('When you pick back up next time: Hit record a bunch of times and look at the console for a refresher on what this does');

    /**
     * GOAL
     * ----
     * 
     * We're making a keyboard-playable instrument (like pads).
     * 
     * The logic we have on the record button now, will be set to specific sound pads instead.
     * User hits pads to create recordings: Each key press creates a new Note. The start and stop times come from clicking to toggle record.
     *                                                                         Each Note will have a new property: 'sound' so it knows what sound to make.
     * 
     *                                                        Once that works: The start and stop times come from keyDown and keyUp.
     *                                                                         Update the UI so it's clear which key corresponds to which sound.
     * 
     * 
     * The record button will have new functionality:
     * User sets recording mode to ON. No notes are saved yet, we're just on standby. Maybe show a ticking timer, make the Rec button glow, whatever. WE ARE ON THE AIR.
     * The sound pads always make noise, but they only save to the array when recording mode is on.
     * 
     * 
     */




    function Note(startTime = null, stopTime = null) {
      return {
        start: startTime,
        stop: stopTime,
        setStart: function(time) {
          this.start = time;
        },
        setStop: function(time) {
          this.stop = time;
        },
        getDuration: function() {
          if (this.start && this.stop) {
            return this.stop - this.start;
          } else {
            console.warn("\nNote start and stop times aren't initialized.\nIf this was unexpected, please check that the recording successfully started and stopped.\nYou may also need to reload the page.");
            return 0;
          }
        }
      }
    }
    
    function toggleRecState(time) {
      recording = !recording;
      console.log('recording:', recording);

      if (recording) {
        startRecord(time);
      } else {
        stopRecord(time);
      }
    }

    function startRecord(time) {
      console.log('started recording at ', time);
      currentNote.start = time;
    };
    
    function stopRecord(stopTime) {
      console.log('stopped recording at ', stopTime);
      currentNote.stop = stopTime;

      // save
      recordedNotes.push(currentNote);

      // reset, ready for next note
      currentNote = new Note();
      
      // verify
      logRecordings();
    }

    function play() {
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
    }
    
    function playBuzz() {
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
    }
    
    function playTinFuzz() {
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
    }

    function logRecordings() {
      console.log('\nrecordedNotes:');
      recordedNotes.forEach(note => {
        console.log('Duration:', note.getDuration());
      });
    }

    // Controls
    document.querySelector('#rec').addEventListener('click', e => {
        toggleRecState(new Date());
    });

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
      recording = false;
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
} catch (error) {
  console.log(error);
}
