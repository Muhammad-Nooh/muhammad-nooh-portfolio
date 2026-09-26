/* =========================================================
   QA RAILWAY — CONTINUOUS MOVING TRAIN
========================================================= */

(() => {

    const railway = document.getElementById("qaRailway");
    const train = document.getElementById("qaTrain");

    if (!railway || !train) {
        console.warn("QA Railway elements not found.");
        return;
    }

    const stageLabel =
        document.getElementById("qaTrainStage");

    const hudStage =
        document.getElementById("qaHudStage");

    const progressBar =
        document.getElementById("qaRailwayProgress");

    const stationElements = [
        ...railway.querySelectorAll(".qa-station")
    ];

    const stations = [
        {
            name: "PLANNING",
            progress: 0
        },
        {
            name: "REQUIREMENTS ANALYSIS",
            progress: 20
        },
        {
            name: "TEST DESIGN",
            progress: 40
        },
        {
            name: "TEST EXECUTION",
            progress: 60
        },
        {
            name: "DEFECT / RETEST",
            progress: 78
        },
        {
            name: "TEST CLOSURE",
            progress: 96
        }
    ];


    /* =====================================================
       SETTINGS
    ===================================================== */

    const LOOP_DURATION = 16000; // 16 seconds
    const START_POSITION = 4;
    const END_POSITION = 96;

    let startTime = null;


    /* =====================================================
       EASING
    ===================================================== */

    function easeInOut(value) {

        return value < 0.5
            ? 4 * value * value * value
            : 1 -
              Math.pow(
                  -2 * value + 2,
                  3
              ) / 2;
    }


    /* =====================================================
       FIND CURRENT STATION
    ===================================================== */

    function getCurrentStation(progress) {

        let activeStation = stations[0];

        for (const station of stations) {

            if (progress >= station.progress) {

                activeStation = station;

            }

        }

        return activeStation;
    }


    /* =====================================================
       UPDATE STATION UI
    ===================================================== */

    function updateStation(progress) {

        const currentStation =
            getCurrentStation(progress);

        const currentIndex =
            stations.indexOf(currentStation);


        stationElements.forEach(
            (station, index) => {

                station.classList.toggle(
                    "is-active",
                    index === currentIndex
                );

                station.classList.toggle(
                    "is-complete",
                    index < currentIndex
                );

            }
        );


        if (stageLabel) {

            stageLabel.textContent =
                currentStation.name;

        }


        if (hudStage) {

            hudStage.textContent =
                currentStation.name;

        }
    }


    /* =====================================================
       MAIN TRAIN ANIMATION
    ===================================================== */

    function animateTrain(timestamp) {

        if (!startTime) {

            startTime = timestamp;

        }


        const elapsed =
            timestamp - startTime;


        /* Continuous 0 → 1 loop */

        let loopProgress =
            (elapsed % LOOP_DURATION) /
            LOOP_DURATION;


        /* Smooth movement */

        const smoothProgress =
            easeInOut(loopProgress);


        /* Move between top and bottom */

        const trainPosition =
            START_POSITION +
            (
                (END_POSITION - START_POSITION) *
                smoothProgress
            );


        train.style.setProperty(
            "--train-y",
            `${trainPosition}%`
        );


        /* Update progress indicator */

        if (progressBar) {

            progressBar.style.width =
                `${loopProgress * 100}%`;

        }


        /* Update STLC station */

        updateStation(
            loopProgress * 100
        );


        requestAnimationFrame(
            animateTrain
        );
    }


    /* =====================================================
       START
    ===================================================== */

    requestAnimationFrame(
        animateTrain
    );


    /* =====================================================
       PAUSE WHEN TAB IS NOT VISIBLE
       Saves browser resources.
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "hidden"
            ) {

                startTime = null;

            }

        }
    );

})();