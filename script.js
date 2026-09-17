/* =========================
   ZEITSTRAHL ANIMATION
========================= */

const timelineItems =
    document.querySelectorAll(".timeline-item");


const timelineObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    timelineObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


timelineItems.forEach((item) => {

    timelineObserver.observe(item);

});



/* =========================
   100 JAHRE COUNTER
========================= */

const counter =
    document.getElementById("year-counter");

const counterSection =
    document.querySelector(".counter-section");


let counterStarted = false;


function startCounter() {

    if (!counter || counterStarted) {
        return;
    }

    counterStarted = true;

    const target = 100;

    const duration = 2200;

    const startTime =
        performance.now();


    function animate(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /* sanftes Abbremsen */

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                eased * target
            );


        counter.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                animate
            );

        } else {

            counter.textContent =
                target;

        }

    }


    requestAnimationFrame(
        animate
    );

}


/* =========================
   COUNTER ERKENNEN
========================= */

if (counterSection) {

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        startCounter();

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    counterObserver.observe(
        counterSection
    );

}


/* =========================
   FOTO LIGHTBOX
========================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightbox-image");

const lightboxClose =
    document.getElementById("lightbox-close");


const galleryImages =
    document.querySelectorAll(
        ".lightbox-image"
    );


if (
    lightbox &&
    lightboxImage &&
    lightboxClose
) {

    galleryImages.forEach((image) => {

        image.addEventListener(
            "click",
            () => {

                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;

                lightbox.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightbox();

            }

        }
    );

}