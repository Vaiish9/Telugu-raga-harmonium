// =====================================================
// TELUGU RAGA HARMONIUM
// =====================================================

const harmonium = document.getElementById("harmonium");

if (harmonium) {

    // =================================================
    // PITCHES
    // =================================================

    const pitches = [
        { name: "C3", frequency: 130.81 },
        { name: "C#3", frequency: 138.59 },
        { name: "D3", frequency: 146.83 },
        { name: "D#3", frequency: 155.56 },
        { name: "E3", frequency: 164.81 },
        { name: "F3", frequency: 174.61 },
        { name: "F#3", frequency: 185.00 },
        { name: "G3", frequency: 196.00 },
        { name: "G#3", frequency: 207.65 },
        { name: "A3", frequency: 220.00 },
        { name: "A#3", frequency: 233.08 },
        { name: "B3", frequency: 246.94 },

        { name: "C4", frequency: 261.63 },
        { name: "C#4", frequency: 277.18 },
        { name: "D4", frequency: 293.66 },
        { name: "D#4", frequency: 311.13 },
        { name: "E4", frequency: 329.63 },
        { name: "F4", frequency: 349.23 },
        { name: "F#4", frequency: 369.99 },
        { name: "G4", frequency: 392.00 },
        { name: "G#4", frequency: 415.30 },
        { name: "A4", frequency: 440.00 },
        { name: "A#4", frequency: 466.16 },
        { name: "B4", frequency: 493.88 }
    ];


    // =================================================
    // STARTING SA = C4
    // =================================================

    let pitchIndex = 12;


    // =================================================
    // SWARAS
    // =================================================

    const whiteSwaras = [
        "Sa",
        "Ri",
        "Ga",
        "Ma",
        "Pa",
        "Dha",
        "Ni"
    ];


    const blackSwaras = [
        "Ri₁",
        "Ga₂",
        "Ma₂",
        "Dha₁",
        "Ni₂"
    ];


    // =================================================
    // BLACK KEY POSITIONS
    // =================================================

    const blackPositions = [
        0,
        1,
        3,
        4,
        5
    ];


    // =================================================
    // COMPUTER KEYBOARD
    // =================================================

    const whiteKeyboardKeys = [
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",

        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",

        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u"
    ];


    const blackKeyboardKeys = [
        "1",
        "2",
        "3",
        "4",
        "5",

        "6",
        "7",
        "8",
        "9",
        "0",

        "-",
        "=",
        "[",
        "]",
        "\\"
    ];


    // =================================================
    // SWARA RATIOS
    // =================================================

    const ratios = {

        "Sa": 1,

        "Ri": 9 / 8,

        "Ga": 5 / 4,

        "Ma": 4 / 3,

        "Pa": 3 / 2,

        "Dha": 5 / 3,

        "Ni": 15 / 8

    };


    // =================================================
    // HTML ELEMENTS
    // =================================================

    const saPitch =
        document.getElementById("saPitch");

    const decreaseSa =
        document.getElementById("decreaseSa");

    const increaseSa =
        document.getElementById("increaseSa");

    const testSa =
        document.getElementById("testSa");


    // =================================================
    // AUDIO
    // =================================================

    let audioContext = null;


    function getAudioContext() {

        if (!audioContext) {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            if (!AudioContext) {

                alert(
                    "Your browser does not support audio."
                );

                return null;
            }


            audioContext =
                new AudioContext();

        }


        if (
            audioContext.state === "suspended"
        ) {

            audioContext.resume();

        }


        return audioContext;

    }


    // =================================================
    // SHOW FREQUENCY ON PRESSED KEY
    // =================================================

    function showFrequencyOnKey(
        key,
        frequency
    ) {

        // Remove old frequency

        const oldFrequency =
            key.querySelector(
                ".pressed-frequency"
            );


        if (oldFrequency) {

            oldFrequency.remove();

        }


        // Create frequency

        const frequencyLabel =
            document.createElement(
                "span"
            );


        frequencyLabel.className =
            "pressed-frequency";


        frequencyLabel.textContent =
            frequency.toFixed(2) +
            " Hz";


        key.appendChild(
            frequencyLabel
        );


        // Highlight key

        key.classList.add(
            "pressed"
        );


        // Remove after short time

        clearTimeout(
            key.frequencyTimer
        );


        key.frequencyTimer =
            setTimeout(
                function () {

                    frequencyLabel.remove();

                    key.classList.remove(
                        "pressed"
                    );

                },
                1000
            );

    }


    // =================================================
    // PLAY NOTE
    // =================================================

    function playNote(
        frequency,
        swara,
        key
    ) {

        // Show frequency immediately

        if (key) {

            showFrequencyOnKey(
                key,
                frequency
            );

        }


        const context =
            getAudioContext();


        if (!context) {

            return;

        }


        const masterGain =
            context.createGain();


        masterGain.connect(
            context.destination
        );


        const harmonics = [

            {
                multiple: 1,
                volume: 0.55
            },

            {
                multiple: 2,
                volume: 0.22
            },

            {
                multiple: 3,
                volume: 0.12
            },

            {
                multiple: 4,
                volume: 0.06
            }

        ];


        harmonics.forEach(
            function (harmonic) {

                const oscillator =
                    context.createOscillator();


                const gain =
                    context.createGain();


                oscillator.type =
                    "sawtooth";


                oscillator.frequency.value =
                    frequency *
                    harmonic.multiple;


                gain.gain.value =
                    harmonic.volume;


                oscillator.connect(
                    gain
                );


                gain.connect(
                    masterGain
                );


                oscillator.start();


                oscillator.stop(
                    context.currentTime +
                    1.5
                );

            }
        );


        masterGain.gain.setValueAtTime(
            0,
            context.currentTime
        );


        masterGain.gain.linearRampToValueAtTime(
            0.25,
            context.currentTime +
            0.04
        );


        masterGain.gain.exponentialRampToValueAtTime(
            0.01,
            context.currentTime +
            1.5
        );

    }


    // =================================================
    // UPDATE SA DISPLAY
    // =================================================

    function updateSaDisplay() {

        if (!saPitch) {

            return;

        }


        const selectedPitch =
            pitches[pitchIndex];


        saPitch.textContent =
            selectedPitch.name +
            " • " +
            selectedPitch.frequency.toFixed(2) +
            " Hz";

    }


    // =================================================
    // CREATE LABEL
    // =================================================

    function createLabel(
        text,
        className
    ) {

        const label =
            document.createElement(
                "span"
            );


        label.className =
            className;


        label.textContent =
            text;


        return label;

    }


    // =================================================
    // CREATE WHITE KEY
    // =================================================

    function createWhiteKey(
        swara,
        keyboardKey,
        frequency,
        index
    ) {

        const key =
            document.createElement(
                "button"
            );


        key.className =
            "key white";


        // Position

        const whiteWidth =
            100 / 21;


        key.style.left =
            `${index * whiteWidth}%`;


        // Swara

        key.appendChild(
            createLabel(
                swara,
                "note-name"
            )
        );


        // Computer key

        key.appendChild(
            createLabel(
                keyboardKey.toUpperCase(),
                "keyboard-label"
            )
        );


        // Data

        key.dataset.keyboard =
            keyboardKey;


        key.dataset.frequency =
            frequency;


        key.dataset.swara =
            swara;


        // Click

        key.addEventListener(
            "click",
            function () {

                playNote(
                    frequency,
                    swara,
                    key
                );

            }
        );


        return key;

    }


    // =================================================
    // CREATE BLACK KEY
    // =================================================

    function createBlackKey(
        swara,
        keyboardKey,
        frequency,
        whiteIndex
    ) {

        const key =
            document.createElement(
                "button"
            );


        key.className =
            "key black";


        // Position

        const whiteWidth =
            100 / 21;


        const position =
            (whiteIndex + 1) *
            whiteWidth;


        key.style.left =
            `${position}%`;


        // Swara

        key.appendChild(
            createLabel(
                swara,
                "note-name"
            )
        );


        // Computer key

        key.appendChild(
            createLabel(
                keyboardKey.toUpperCase(),
                "keyboard-label"
            )
        );


        // Data

        key.dataset.keyboard =
            keyboardKey;


        key.dataset.frequency =
            frequency;


        key.dataset.swara =
            swara;


        // Click

        key.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                playNote(
                    frequency,
                    swara,
                    key
                );

            }
        );


        return key;

    }


    // =================================================
    // CREATE HARMONIUM
    // =================================================

    function createHarmonium() {

        harmonium.innerHTML =
            "";


        const baseFrequency =
            pitches[pitchIndex].frequency;


        // =================================================
        // WHITE KEYS
        // =================================================

        let whiteIndex = 0;


        for (
            let octave = 3;
            octave <= 5;
            octave++
        ) {

            whiteSwaras.forEach(
                function (swara) {

                    const frequency =
                        baseFrequency *
                        ratios[swara] *
                        Math.pow(
                            2,
                            octave - 4
                        );


                    const keyboardKey =
                        whiteKeyboardKeys[
                            whiteIndex
                        ];


                    const key =
                        createWhiteKey(
                            swara,
                            keyboardKey,
                            frequency,
                            whiteIndex
                        );


                    harmonium.appendChild(
                        key
                    );


                    whiteIndex++;

                }
            );

        }


        // =================================================
        // BLACK KEYS
        // =================================================

        let blackIndex = 0;


        for (
            let octave = 3;
            octave <= 5;
            octave++
        ) {

            blackPositions.forEach(
                function (position) {

                    const whiteIndex =
                        (
                            octave - 3
                        ) * 7 +
                        position;


                    const whiteFrequency =
                        baseFrequency *
                        ratios[
                            whiteSwaras[
                                position
                            ]
                        ] *
                        Math.pow(
                            2,
                            octave - 4
                        );


                    const frequency =
                        whiteFrequency *
                        Math.pow(
                            2,
                            1 / 12
                        );


                    const swara =
                        blackSwaras[
                            blackIndex % 5
                        ];


                    const keyboardKey =
                        blackKeyboardKeys[
                            blackIndex
                        ];


                    const key =
                        createBlackKey(
                            swara,
                            keyboardKey,
                            frequency,
                            whiteIndex
                        );


                    harmonium.appendChild(
                        key
                    );


                    blackIndex++;

                }
            );

        }

    }


    // =================================================
    // DECREASE SA
    // =================================================

    if (decreaseSa) {

        decreaseSa.addEventListener(
            "click",
            function () {

                if (pitchIndex > 0) {

                    pitchIndex--;

                    updateSaDisplay();

                    createHarmonium();

                }

            }
        );

    }


    // =================================================
    // INCREASE SA
    // =================================================

    if (increaseSa) {

        increaseSa.addEventListener(
            "click",
            function () {

                if (
                    pitchIndex <
                    pitches.length - 1
                ) {

                    pitchIndex++;

                    updateSaDisplay();

                    createHarmonium();

                }

            }
        );

    }


    // =================================================
    // TEST SA
    // =================================================

    if (testSa) {

        testSa.addEventListener(
            "click",
            function () {

                // Find middle Sa

                const keys =
                    harmonium.querySelectorAll(
                        ".white"
                    );


                for (const key of keys) {

                    if (
                        key.dataset.swara ===
                        "Sa"
                    ) {

                        const frequency =
                            Number(
                                key.dataset.frequency
                            );


                        playNote(
                            frequency,
                            "Sa",
                            key
                        );


                        break;

                    }

                }

            }
        );

    }


    // =================================================
    // COMPUTER KEYBOARD
    // =================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.repeat) {

                return;

            }


            const pressedKey =
                event.key.toLowerCase();


            const keys =
                harmonium.querySelectorAll(
                    ".key"
                );


            for (const key of keys) {

                if (
                    key.dataset.keyboard ===
                    pressedKey
                ) {

                    const frequency =
                        Number(
                            key.dataset.frequency
                        );


                    const swara =
                        key.dataset.swara;


                    playNote(
                        frequency,
                        swara,
                        key
                    );


                    break;

                }

            }

        }
    );


    // =================================================
    // INITIALIZE
    // =================================================

    updateSaDisplay();

    createHarmonium();

}