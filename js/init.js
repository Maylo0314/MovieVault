const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

document.getElementById('navbarButton').addEventListener('click', OpenDrawer);

function OpenDrawer(){
    drawer.open = true;
}

function CloseDrawer(){
    drawer.open = false;
}

document.getElementById('navbarText').addEventListener('click', removeClass);

function removeClass() {
    const mainclass = document.querySelectorAll('.mdc-image-list__item');
    const test = document.querySelectorAll('.mdc-tab, .mdc-tab-indicator');
    test.forEach(test => {
        test.classList.remove("mdc-tab--active", "mdc-tab-indicator--active");
    });

    mainclass.forEach(item => {
        item.classList.remove("hidden");
    });
}

function shareApp() {
    
    navigator.share({
        title: "MovieVault",
        text: "",
        url: window.navigator.url,
    });
}
