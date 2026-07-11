/* =====================================
   PORTFOLIO JS
   Rao Umar Portfolio
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    initScrollReveal();

    initSmoothScroll();

    initActiveNavigation();

});


/* =====================================
   STICKY NAVBAR
===================================== */

function initNavbar() {

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* =====================================
   SMOOTH NAVIGATION
===================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}


/* =====================================
   ACTIVE NAV LINK
===================================== */

function initActiveNavigation() {

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            const height = section.offsetHeight;

            if(window.scrollY >= top){

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if(link.getAttribute("href") === "#" + current){

                link.classList.add("active");

            }

        });

    });

}


/* =====================================
   SCROLL REVEAL
===================================== */

function initScrollReveal(){

    const elements = document.querySelectorAll(

        "#about, #experience, #projects, #skills, #certifications, #contact"

    );

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>{

        el.classList.add("hidden");

        observer.observe(el);

    });

}

const section = document.querySelector("#sectionPin");
const pinWrap = document.querySelector(".pin-wrap");

function horizontalScroll() {

    const rect = section.getBoundingClientRect();

    const sectionHeight = section.offsetHeight;
    const viewport = window.innerHeight;

    const progress = Math.min(
        Math.max(-rect.top / (sectionHeight - viewport), 0),
        1
    );

    const maxTranslate =
        pinWrap.scrollWidth - window.innerWidth;

    pinWrap.style.transform =
        `translateX(-${progress * maxTranslate}px)`;
}

window.addEventListener("scroll", horizontalScroll);
window.addEventListener("resize", horizontalScroll);

horizontalScroll();