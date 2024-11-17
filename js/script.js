let menuIcon = document.querySelector('#menu-icon');
let mavbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    mavbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    let header = document.querySelector('header');

    header.classList.toggle('seticky', window.scrollY > 100);
};

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading, .home-content p', {origin: 'top'});
ScrollReveal().reveal('.home-img, .portofolio-box, .portofolio-box-certificate, .contact form, .about-content', {origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('', {origin: 'right'});


const typed = new Typed('.multiple-text', {
    strings: ['Flutter Developer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});