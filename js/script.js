document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    const revealElements = document.querySelectorAll(
        "#about, #expertise, #skills, #projects, #experience, #contact, " +
        ".skill-card, .project-card, .experience-item, .about-details div, " +
        ".expertise-card, .timeline-item"
    );

    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        element.style.transitionDelay =
            `${(index % 5) * 80}ms`;

    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =========================================================
       HERO MOUSE PARALLAX
    ========================================================= */

    const hero = document.querySelector("#home");

    if (hero) {

        hero.addEventListener("mousemove", (event) => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            const moveX = x * 18;
            const moveY = y * 12;

            document.documentElement.style.setProperty(
                "--hero-x",
                `${moveX}px`
            );

            document.documentElement.style.setProperty(
                "--hero-y",
                `${moveY}px`
            );

        });


        hero.addEventListener("mouseleave", () => {

            document.documentElement.style.setProperty(
                "--hero-x",
                "0px"
            );

            document.documentElement.style.setProperty(
                "--hero-y",
                "0px"
            );

        });

    }


    /* =========================================================
       CARD TILT EFFECT
    ========================================================= */

    const cards = document.querySelectorAll(
        ".skill-card, .project-card"
    );


    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =========================================================
       PROJECT DETAILS
    ========================================================= */

    const projectData = {

        "digital-kisaan": {
            type: "MIS / Financial Management",
            title: "Digital Kisaan",
            description:
                "MIS platform involving financial accounting, credit management, cooperative governance, inventory, member registration, valuation, depreciation, access control, and data integrity.",
            focus:
                "Financial accounting and credit management workflows",
            testing:
                "Functional, end-to-end, regression",
            tools:
                "Test cases, defect tracking, workflow validation",
            contribution:
                "Validated GL, Trial Balance, Balancing, Client Management, loan lifecycle, repayments, service charges, governance, inventory, valuation, depreciation, role-based access, and data integrity."
        },


        "hfi": {
            type: "Order Tracking",
            title: "HFI – Order Tracking System",
            description:
                "Order tracking and processing system tested across internal and external certification workflows with cross-module validation.",
            focus:
                "Order tracking and processing workflows",
            testing:
                "Functional, end-to-end, regression",
            tools:
                "Jira, test cases, registration testing",
            contribution:
                "Validated cross-module data consistency, reported defects in Jira, and performed registration testing after fixes."
        },


        "loanleaf": {
            type: "Loan Management",
            title: "LoanLeaf",
            description:
                "Loan management application covering loan registration, approval, disbursement, repayment, and backend validation.",
            focus:
                "Loan lifecycle and backend workflows",
            testing:
                "Functional, registration, API",
            tools:
                "Postman, SQL, SaaS backend validation",
            contribution:
                "Tested loan workflows, performed API validation, verified backend data, and identified, tracked, and retested defects."
        },


        "dfs": {
            type: "Mobile Banking",
            title: "Mobile App DFS",
            description:
                "Digital banking mobile application covering authentication, account management, transaction workflows, and backend API communication.",
            focus:
                "Digital banking mobile workflows",
            testing:
                "Functional, regression, API",
            tools:
                "Postman, API validation",
            contribution:
                "Tested login, account management, transactions, and backend responses while coordinating issue investigation with developers."
        },


        "ciihive": {
            type: "Banking System",
            title: "CiiHive",
            description:
                "Banking system covering financial workflows, transactions, account management, API integration, and backend processing.",
            focus:
                "Banking workflows and financial transactions",
            testing:
                "API, integration, end-to-end",
            tools:
                "API testing, backend validation",
            contribution:
                "Tested banking workflows, financial transactions, account management, API integrations, and backend processing while supporting release validation."
        },


        "ebda": {
            type: "Banking & eKYC",
            title: "EDBA / MCONNECT",
            description:
                "Banking and eKYC platform involving production support, functional verification, API validation, defect resolution, and release verification.",
            focus:
                "Production support and eKYC integration",
            testing:
                "API, integration, functional, production validation",
            tools:
                "API testing, application logs, backend analysis",
            contribution:
                "Investigated banking application issues, performed eKYC API validation, analyzed authentication and data integrity, and used backend and application logs where required."
        }

    };


    const projectModal =
        document.getElementById("projectModal");

    const projectModalClose =
        document.getElementById("projectModalClose");

    const modalProjectType =
        document.getElementById("modalProjectType");

    const modalProjectTitle =
        document.getElementById("modalProjectTitle");

    const modalProjectDescription =
        document.getElementById("modalProjectDescription");

    const modalProjectFocus =
        document.getElementById("modalProjectFocus");

    const modalProjectTesting =
        document.getElementById("modalProjectTesting");

    const modalProjectTools =
        document.getElementById("modalProjectTools");

    const modalProjectContribution =
        document.getElementById(
            "modalProjectContribution"
        );


    function closeProjectModal() {

        if (!projectModal) {
            return;
        }

        projectModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (
        projectModal &&
        projectModalClose
    ) {

        document.querySelectorAll(
            ".project-details-btn"
        ).forEach((button) => {

            button.addEventListener("click", () => {

                const project =
                    projectData[
                        button.dataset.project
                    ];

                if (!project) {
                    return;
                }


                if (modalProjectType) {
                    modalProjectType.textContent =
                        project.type;
                }

                if (modalProjectTitle) {
                    modalProjectTitle.textContent =
                        project.title;
                }

                if (modalProjectDescription) {
                    modalProjectDescription.textContent =
                        project.description;
                }

                if (modalProjectFocus) {
                    modalProjectFocus.textContent =
                        project.focus;
                }

                if (modalProjectTesting) {
                    modalProjectTesting.textContent =
                        project.testing;
                }

                if (modalProjectTools) {
                    modalProjectTools.textContent =
                        project.tools;
                }

                if (modalProjectContribution) {
                    modalProjectContribution.textContent =
                        project.contribution;
                }


                projectModal.classList.add("active");

                document.body.style.overflow =
                    "hidden";

            });

        });


        projectModalClose.addEventListener(
            "click",
            closeProjectModal
        );


        const overlay =
            projectModal.querySelector(
                ".project-modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeProjectModal
            );

        }

    }


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeProjectModal();

                closeMobileMenu();

            }

        }
    );


    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    function closeMobileMenu() {

        if (!menuToggle || !navMenu) {
            return;
        }

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle(
                        "active"
                    );

                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

            }
        );


        navMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            });

    }

});