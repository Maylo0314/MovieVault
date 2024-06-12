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

async function copyToClipboard(text) {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        document.body.removeChild(textarea);
    }
}

function shareApp() {
    const url = `https://net24melfrink.gc-webhosting.nl/MovieVault/`;
    copyToClipboard(url);
}
