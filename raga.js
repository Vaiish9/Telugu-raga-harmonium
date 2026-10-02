// =====================================================
// TELUGU RAGA HARMONIUM
// RAGA LEARNING MODE
// =====================================================


// =====================================================
// RAGA DATA
// =====================================================

const ragas = {

    mohanam: {

        name: "Mohanam",

        description:
            "A beautiful pentatonic raga with five main swaras.",

        arohanam: [
            ["Sa", 4],
            ["Ri₂", 4],
            ["Ga₃", 4],
            ["Pa", 4],
            ["Dha₂", 4],
            ["Sa", 5]
        ],

        avarohanam: [
            ["Sa", 5],
            ["Dha₂", 4],
            ["Pa", 4],
            ["Ga₃", 4],
            ["Ri₂", 4],
            ["Sa", 4]
        ],

        mainSwaras:
            "Sa • Ri₂ • Ga₃ • Pa • Dha₂",

        type:
            "Pentatonic Raga",

        character:
            "Bright, pleasant and devotional",

        practice:
            "Practice the five main swaras on the harmonium."
    },


    shankarabharanam: {

        name: "Shankarabharanam",

        description:
            "A major-scale raga with all seven natural swaras.",

        arohanam: [
            ["Sa", 4],
            ["Ri₂", 4],
            ["Ga₃", 4],
            ["Ma₁", 4],
            ["Pa", 4],
            ["Dha₂", 4],
            ["Ni₃", 4],
            ["Sa", 5]
        ],

        avarohanam: [
            ["Sa", 5],
            ["Ni₃", 4],
            ["Dha₂", 4],
            ["Pa", 4],
            ["Ma₁", 4],
            ["Ga₃", 4],
            ["Ri₂", 4],
            ["Sa", 4]
        ],

        mainSwaras:
            "Sa • Ri₂ • Ga₃ • Ma₁ • Pa • Dha₂ • Ni₃",

        type:
            "Sampurna Raga",

        character:
            "Balanced, bright and melodious",

        practice:
            "Practice all seven swaras in ascending and descending order."
    },


    kalyani: {

        name: "Kalyani",

        description:
            "A bright and expressive raga featuring the prati madhyamam.",

        arohanam: [
            ["Sa", 4],
            ["Ri₂", 4],
            ["Ga₃", 4],
            ["Ma₂", 4],
            ["Pa", 4],
            ["Dha₂", 4],
            ["Ni₃", 4],
            ["Sa", 5]
        ],

        avarohanam: [
            ["Sa", 5],
            ["Ni₃", 4],
            ["Dha₂", 4],
            ["Pa", 4],
            ["Ma₂", 4],
            ["Ga₃", 4],
            ["Ri₂", 4],
            ["Sa", 4]
        ],

        mainSwaras:
            "Sa • Ri₂ • Ga₃ • Ma₂ • Pa • Dha₂ • Ni₃",

        type:
            "Sampurna Raga",

        character:
            "Bright, graceful and expressive",

        practice:
            "Pay special attention to Ma₂ while practicing."
    },


    mayamalavagowla: {

        name: "Mayamalavagowla",

        description:
            "A foundational raga commonly used for learning basic swara exercises.",

        arohanam: [
            ["Sa", 4],
            ["Ri₁", 4],
            ["Ga₃", 4],
            ["Ma₁", 4],
            ["Pa", 4],
            ["Dha₁", 4],
            ["Ni₃", 4],
            ["Sa", 5]
        ],

        avarohanam: [
            ["Sa", 5],
            ["Ni₃", 4],
            ["Dha₁", 4],
            ["Pa", 4],
            ["Ma₁", 4],
            ["Ga₃", 4],
            ["Ri₁", 4],
            ["Sa", 4]
        ],

        mainSwaras:
            "Sa • Ri₁ • Ga₃ • Ma₁ • Pa • Dha₁ • Ni₃",

        type:
            "Sampurna Raga",

        character:
            "Traditional, structured and devotional",

        practice:
            "Practice slowly and clearly to understand the swara positions."
    }

};


// =====================================================
// HTML ELEMENTS
// =====================================================

const ragaSelect =
    document.getElementById("ragaSelect");

const ragaName =
    document.getElementById("ragaName");

const ragaDescription =
    document.getElementById("ragaDescription");

const arohanam =
    document.getElementById("arohanam");

const avarohanam =
    document.getElementById("avarohanam");

const mainSwaras =
    document.getElementById("mainSwaras");

const ragaType =
    document.getElementById("ragaType");

const ragaCharacter =
    document.getElementById("ragaCharacter");

const ragaPracticeInfo =
    document.getElementById("ragaPracticeInfo");

const practiceArohanam =
    document.getElementById("practiceArohanam");

const practiceAvarohanam =
    document.getElementById("practiceAvarohanam");


// =====================================================
// PRACTICE DISPLAY
// =====================================================

let practiceDisplay =
    document.getElementById("ragaPracticeDisplay");


if (!practiceDisplay) {

    practiceDisplay =
        document.createElement("div");

    practiceDisplay.id =
        "ragaPracticeDisplay";

    practiceDisplay.style.margin =
        "18px auto 0";

    practiceDisplay.style.padding =
        "12px 22px";

    practiceDisplay.style.width =
        "fit-content";

    practiceDisplay.style.minWidth =
        "180px";

    practiceDisplay.style.borderRadius =
        "12px";

    practiceDisplay.style.background =
        "rgba(118, 80, 165, 0.10)";

    practiceDisplay.style.color =
        "#5a321b";

    practiceDisplay.style.fontWeight =
        "700";

    practiceDisplay.style.textAlign =
        "center";

    const practiceSection =
        document.querySelector(".raga-practice");

    if (practiceSection) {

        practiceSection.appendChild(
            practiceDisplay
        );

    }

}


// =====================================================
// AUDIO
// =====================================================

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


// =====================================================
// SWARA INTERVALS
// =====================================================
//
// Equal-tempered semitone positions relative to Sa.
// This gives each swara a different pitch.
// =====================================================

const swaraSemitones = {

    "Sa": 0,

    "Ri₁": 1,

    "Ri₂": 2,

    "Ga₂": 3,

    "Ga₃": 4,

    "Ma₁": 5,

    "Ma₂": 6,

    "Pa": 7,

    "Dha₁": 8,

    "Dha₂": 9,

    "Ni₂": 10,

    "Ni₃": 11

};


// =====================================================
// GET SWARA FREQUENCY
// =====================================================

function getSwaraFrequency(
    swara,
    octave
) {

    // C4 = Sa
    const saFrequency =
        261.63;


    const semitone =
        swaraSemitones[swara];


    if (semitone === undefined) {

        return saFrequency;
    }


    const octaveDifference =
        octave - 4;


    return (
        saFrequency *
        Math.pow(
            2,
            octaveDifference +
            semitone / 12
        )
    );

}


// =====================================================
// PLAY ONE SWARA
// =====================================================

function playSwara(
    swara,
    octave
) {

    const context =
        getAudioContext();

    if (!context) {
        return;
    }


    const frequency =
        getSwaraFrequency(
            swara,
            octave
        );


    // ---------------------------------------------
    // MASTER GAIN
    // ---------------------------------------------

    const masterGain =
        context.createGain();


    masterGain.connect(
        context.destination
    );


    masterGain.gain.setValueAtTime(
        0,
        context.currentTime
    );


    masterGain.gain.linearRampToValueAtTime(
        0.22,
        context.currentTime + 0.04
    );


    masterGain.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + 0.70
    );


    // ---------------------------------------------
    // HARMONIUM-LIKE HARMONICS
    // ---------------------------------------------

    const harmonics = [

        {
            multiple: 1,
            volume: 0.70
        },

        {
            multiple: 2,
            volume: 0.18
        },

        {
            multiple: 3,
            volume: 0.08
        },

        {
            multiple: 4,
            volume: 0.04
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
                context.currentTime + 0.75
            );

        }
    );


    return frequency;

}


// =====================================================
// DISPLAY CURRENT SWARA
// =====================================================

function showPracticeNote(
    direction,
    swara,
    octave,
    frequency
) {

    if (!practiceDisplay) {
        return;
    }


    let displaySwara =
        swara;


    // Show upper octave with '

    if (octave === 5) {

        displaySwara =
            swara + "'";

    }


    practiceDisplay.innerHTML =
        direction +
        "<br><br>" +
        "🎵 <strong>" +
        displaySwara +
        "</strong>" +
        "<br>" +
        frequency.toFixed(2) +
        " Hz";

}


// =====================================================
// PLAY RAGA SEQUENCE
// =====================================================

function playRagaSequence(
    sequence,
    direction
) {

    if (
        !sequence ||
        sequence.length === 0
    ) {
        return;
    }


    getAudioContext();


    let index = 0;


    if (practiceDisplay) {

        practiceDisplay.innerHTML =
            direction +
            "<br><br>" +
            "🎵 Starting...";
    }


    // Play first note immediately

    function playNext() {

        if (
            index >=
            sequence.length
        ) {

            if (practiceDisplay) {

                practiceDisplay.innerHTML =
                    direction +
                    "<br><br>" +
                    "✓ Practice Completed";
            }

            return;
        }


        const note =
            sequence[index];


        const swara =
            note[0];


        const octave =
            note[1];


        const frequency =
            playSwara(
                swara,
                octave
            );


        showPracticeNote(
            direction,
            swara,
            octave,
            frequency
        );


        index++;


        setTimeout(
            playNext,
            800
        );

    }


    playNext();

}


// =====================================================
// DISPLAY RAGA
// =====================================================

function formatSequence(
    sequence
) {

    return sequence
        .map(
            function (note) {

                const swara =
                    note[0];

                const octave =
                    note[1];


                if (octave === 5) {

                    return swara + "'";

                }


                return swara;

            }
        )
        .join(" ");

}


// =====================================================
// UPDATE RAGA INFORMATION
// =====================================================

function updateRaga() {

    const selectedRaga =
        ragaSelect.value;


    if (!selectedRaga) {

        ragaName.textContent =
            "Choose a Raga";

        ragaDescription.textContent =
            "Select a raga from the menu to begin learning.";

        arohanam.textContent =
            "—";

        avarohanam.textContent =
            "—";

        mainSwaras.textContent =
            "—";

        ragaType.textContent =
            "—";

        ragaCharacter.textContent =
            "—";

        ragaPracticeInfo.textContent =
            "Select a raga to start practicing.";

        if (practiceDisplay) {

            practiceDisplay.textContent =
                "";
        }

        return;
    }


    const raga =
        ragas[selectedRaga];


    if (!raga) {
        return;
    }


    ragaName.textContent =
        raga.name;


    ragaDescription.textContent =
        raga.description;


    arohanam.textContent =
        formatSequence(
            raga.arohanam
        );


    avarohanam.textContent =
        formatSequence(
            raga.avarohanam
        );


    mainSwaras.textContent =
        raga.mainSwaras;


    ragaType.textContent =
        raga.type;


    ragaCharacter.textContent =
        raga.character;


    ragaPracticeInfo.textContent =
        raga.practice;


    if (practiceDisplay) {

        practiceDisplay.textContent =
            "";
    }

}


// =====================================================
// RAGA SELECTION
// =====================================================

if (ragaSelect) {

    ragaSelect.addEventListener(
        "change",
        updateRaga
    );

}


// =====================================================
// PRACTICE AROHANAM
// =====================================================

if (practiceArohanam) {

    practiceArohanam.addEventListener(
        "click",
        function () {

            const selectedRaga =
                ragaSelect.value;


            if (!selectedRaga) {

                alert(
                    "Please select a raga first."
                );

                return;
            }


            const raga =
                ragas[selectedRaga];


            playRagaSequence(
                raga.arohanam,
                "↑ Arohanam"
            );

        }
    );

}


// =====================================================
// PRACTICE AVAROHANAM
// =====================================================

if (practiceAvarohanam) {

    practiceAvarohanam.addEventListener(
        "click",
        function () {

            const selectedRaga =
                ragaSelect.value;


            if (!selectedRaga) {

                alert(
                    "Please select a raga first."
                );

                return;
            }


            const raga =
                ragas[selectedRaga];


            playRagaSequence(
                raga.avarohanam,
                "↓ Avarohanam"
            );

        }
    );

}


// =====================================================
// INITIALIZE
// =====================================================

updateRaga();