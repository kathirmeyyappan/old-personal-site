const profileImage = document.getElementById('profileImage');
const body = document.getElementById("body")
const title = document.getElementById("title")
const overlay = document.querySelector('.overlay');
var hasClickedProfile = false;

let c = 0;
const pfps = [
    'images/kathir.jpg', 
    'images/bebop.gif', 
    'images/luffy.gif',
    'images/patrick.gif',
    'images/shrek.gif', 
    'images/subway-surfers.gif'
];


function startProfilePulseTimer() {
    // Start profile image pulsing after 3 seconds
    setTimeout(function() {
        if (!hasClickedProfile) {
            profileImage.classList.add("profile-pulse-notification");
        }
    }, 1000);
}

function closeMobileOverlay() {
    document.querySelector('.mobile-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    
    // preload images
    const img = new Image();
    img.src = 'images/error.gif';
    pfps.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    ['linkedin', 'mail', 'mangalert', 'resume', 'github'].forEach((logo) => {
        const img = new Image();
        img.src = `images/${logo}-white.png`;
    })
    logos = document.getElementsByClassName('inline');
    for (let i = 0; i < logos.length; i++) {
        const img = new Image();
        img.src = `images/${logos[i].id}-white.png`;
    }

    var profileImage = document.getElementById("profileImage");
    profileImage.style.cursor = 'pointer';

    document.addEventListener('click', (e) => {
        target = document.elementFromPoint(e.clientX, e.clientY);
        if (target != profileImage && target.className != "inline") {

            // remove collision for logos
            logos = document.getElementsByClassName('inline');
            for (let i = 0; i < logos.length; i++) {
                logos[i].style.pointerEvents = 'none';
            }

            if (overlay.style.opacity == '1') {
                c = (c + 1) % pfps.length;
                profileImage.src = pfps[c]; // next pfp
                if (c == 0) {
                    title.textContent = "Kathir Meyyappan";
                } else {
                    title.textContent = 'Kathir Meyyappan'; // this is what replaces the original text after clicking on pfp once
                }
            }
            overlay.style.opacity = '0'; // hide overlay
            profileImage.style.cursor = 'pointer';
        }
    });

    profileImage.addEventListener("click", () => {
        if (profileImage.style.cursor == 'pointer') {
            hasClickedProfile = true;
            
            // Stop the profile pulsing notification
            profileImage.classList.remove("profile-pulse-notification");

            // add collision for logos
            logos = document.getElementsByClassName('inline');
            for (let i = 0; i < logos.length; i++) {
                logos[i].style.pointerEvents = 'auto';
            }

            profileImage.src = 'images/error.gif'; // buffer pfp
            overlay.style.opacity = '1'; // add overlay

            profileImage.style.cursor = 'default';
        }
    });

    startProfilePulseTimer();
});

// fit overlay in mobile screens
function adjustOverlayContent() {
    const overlayContent = document.querySelector('.overlay-content');
    const overlay = document.querySelector('.overlay');
    if (overlayContent.scrollHeight > window.innerHeight || overlayContent.scrollWidth > window.innerWidth) {
        const scale = 0.9 * Math.min(window.innerHeight / overlayContent.scrollHeight, window.innerWidth / overlayContent.scrollWidth);
        overlayContent.style.transform = `scale(${scale})`;
    } else {
        overlayContent.style.transform = 'scale(1)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    adjustOverlayContent();
});

window.addEventListener('resize', () => {
    adjustOverlayContent(); 
});