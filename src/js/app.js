document.addEventListener{'DOMContentLoaded', function() {

    eventListeners();
}};

function eventListeners() {
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenu.addEventListener('click', navegacionResponsive);
}

function navegacionResponsive() {
    console.log('Menu responsive');
}