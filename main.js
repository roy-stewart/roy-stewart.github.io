function onNavButtonClicked() {
    const navMenu = document.getElementById('site-nav-menu');
    navMenu.classList.toggle('shown');
    const isHidden = !navMenu.classList.contains('shown');
    navMenu.setAttribute('aria-hidden', isHidden);
}
