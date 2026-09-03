// --- 0. BACKGROUND MUSIC CONTROLLER ---
const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

function playBackgroundMusic() {
    if (!musicStarted) {
        bgMusic.currentTime = 0;
        bgMusic.play().then(() => {
            musicStarted = true;
        }).catch(err => {
            console.log("Audio play deferred or blocked: ", err);
        });
    }
}

// --- 1. GENERATE AMBIENT FLOATING FLOWER PETALS ---
const flowerContainer = document.getElementById('flowerContainer');
const flowerEmojis = ['🌸', '💮'];

function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'falling-flower';
    flower.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    
    flower.style.left = Math.random() * 95 + 'vw';
    flower.style.fontSize = Math.random() * (22 - 14) + 14 + 'px';
    flower.style.animationDuration = Math.random() * (8 - 5) + 5 + 's';
    
    flowerContainer.appendChild(flower);
    
    setTimeout(() => { flower.remove(); }, 8000);
}
setInterval(createFlower, 400);

// --- 2. RUNAWAY CONTROLLERS (PAGE 1: OPEN BUTTON) ---
const openBtn = document.getElementById('openBtn');
const btnWrapper1 = document.getElementById('btnWrapper1');
const gifPopup1 = document.getElementById('gifPopup1');
const popupGif1 = document.getElementById('popupGif1');

let clickCount1 = 0;
const maxEscapes1 = 10; 

openBtn.addEventListener('click', function() {
    // Start music on the very first click of the open button!
    playBackgroundMusic();

    clickCount1++;
    if (clickCount1 <= maxEscapes1) {
        btnWrapper1.classList.add('btn-vanished');
        setTimeout(() => {
            handlePrankCentered(btnWrapper1, gifPopup1, popupGif1);
            btnWrapper1.classList.remove('btn-vanished');
        }, 220);
    } else {
        gifPopup1.style.display = 'none';
        triggerTransition('screen1', 'screen2', true);
    }
});

// --- 3. RUNAWAY CONTROLLERS (PAGE 2: CONTINUE BUTTON) ---
const continueBtn = document.getElementById('continueBtn');
const btnWrapper2 = document.getElementById('btnWrapper2');
const gifPopup2 = document.getElementById('gifPopup2');
const popupGif2 = document.getElementById('popupGif2');

let clickCount2 = 0;
const maxEscapes2 = 8; 

continueBtn.addEventListener('click', function() {
    clickCount2++;
    if (clickCount2 <= maxEscapes2) {
        btnWrapper2.classList.add('btn-vanished');
        setTimeout(() => {
            handlePrankFlat(btnWrapper2, gifPopup2, popupGif2);
            btnWrapper2.classList.remove('btn-vanished');
        }, 220);
    } else {
        gifPopup2.style.display = 'none';
        triggerTransition('screen2', 'screen3', false);
    }
});

// --- 4. RUNAWAY CONTROLLERS (PAGE 3 ENVELOPE STAGE: OPEN LETTER BUTTON) ---
const letterBtn = document.getElementById('letterBtn');
const btnWrapper3 = document.getElementById('btnWrapper3');
const gifPopup3 = document.getElementById('gifPopup3');
const popupGif3 = document.getElementById('popupGif3');

let clickCount3 = 0;
const maxEscapes3 = 6; 

letterBtn.addEventListener('click', function() {
    clickCount3++;
    if (clickCount3 <= maxEscapes3) {
        btnWrapper3.classList.add('btn-vanished');
        setTimeout(() => {
            handlePrankFlat(btnWrapper3, gifPopup3, popupGif3);
            btnWrapper3.classList.remove('btn-vanished');
        }, 220);
    } else {
        gifPopup3.style.display = 'none';
        btnWrapper3.style.display = 'none';
        executeCinematicEnvelopeOpen();
    }
});

// Loop Button Prank Controller
let clickCount4 = 0;
const maxEscapes4 = 8; 

function initializeLoopRunaway() {
    const loopBtn = document.getElementById('loopBtn');
    const btnWrapper4 = document.getElementById('btnWrapper4');
    const gifPopup4 = document.getElementById('gifPopup4');
    const popupGif4 = document.getElementById('popupGif4');

    loopBtn.addEventListener('click', function() {
        clickCount4++;
        
        if (clickCount4 === 1) {
            const premiumLetter = document.getElementById('premiumLetter');
            premiumLetter.classList.add('letter-vanished');
        }

        if (clickCount4 <= maxEscapes4) {
            btnWrapper4.classList.add('btn-vanished');
            setTimeout(() => {
                handlePrankFlat(btnWrapper4, gifPopup4, popupGif4);
                btnWrapper4.classList.remove('btn-vanished');
            }, 220);
        } else {
            gifPopup4.style.display = 'none';
            restartExperience();
        }
    });
}

function restartExperience() {
    // Rewind music before reload so it plays fresh when restarting
    bgMusic.pause();
    bgMusic.currentTime = 0;
    location.reload(); 
}

// --- 5. FIXED REPOSITION ENGINES (GLITCH-PROOF MOUSE CHANNELS) ---
function handlePrankCentered(element, popup, gif) {
    const width = element.offsetWidth || 160;
    const maxX = window.innerWidth - width - 60;
    const maxY = window.innerHeight - 200;

    const rx = Math.max(60, Math.floor(Math.random() * maxX));
    const ry = Math.max(140, Math.floor(Math.random() * maxY));

    element.style.position = 'fixed';
    element.style.left = rx + 'px';
    element.style.top = ry + 'px';
    element.style.transform = 'translate(-50%, -50%) scale(1)';

    gif.src = `gif${Math.floor(Math.random() * 9) + 1}.gif`; 
    popup.style.display = 'block';
}

function handlePrankFlat(element, popup, gif) {
    const width = element.offsetWidth || 160;
    const height = element.offsetHeight || 50;

    const padX = 60;
    const padY = 160;

    const maxX = window.innerWidth - width - padX;
    const maxY = window.innerHeight - height - padY;

    const rx = Math.max(padX, Math.floor(Math.random() * (maxX > padX ? maxX : window.innerWidth - width)));
    const ry = Math.max(padY, Math.floor(Math.random() * (maxY > padY ? maxY : window.innerHeight - height)));

    element.style.position = 'fixed';
    element.style.left = rx + 'px';
    element.style.top = ry + 'px';
    element.style.transform = 'none'; 

    gif.src = `gif${Math.floor(Math.random() * 9) + 1}.gif`; 
    popup.style.display = 'block';
}

// --- 6. TRANSITION FLOW MECHANICS ---
const blasterContainer = document.getElementById('blasterContainer');
const blastColors = ['#E65C9C', '#B84793', '#7B2CBF', '#FFC0CB', '#D4AF37', '#FFFFFF'];

function spawnBlasterShower() {
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'blast-particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = '-10px';
            particle.style.backgroundColor = blastColors[Math.floor(Math.random() * blastColors.length)];
            particle.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
            
            const duration = Math.random() * (2.5 - 1.2) + 1.2;
            particle.style.animationDuration = duration + 's';
            blasterContainer.appendChild(particle);
            setTimeout(() => { particle.remove(); }, duration * 1000);
        }, i * 15); 
    }
}

function triggerTransition(currentScreenId, nextScreenId, wantBlasters) {
    const currentScreen = document.getElementById(currentScreenId);
    const nextScreen = document.getElementById(nextScreenId);
    
    currentScreen.style.transition = 'opacity 0.5s ease-out';
    currentScreen.style.opacity = '0';
    
    setTimeout(() => {
        currentScreen.classList.remove('active');
        nextScreen.classList.add('active');
        
        if (nextScreenId === 'screen3') {
            document.getElementById('envelopeScene').classList.add('visible');
        }
        if (wantBlasters) spawnBlasterShower();
    }, 500);
}

// --- 7. DELUXE CINEMATIC ENVELOPE OPENING ANIMATION ENGINE ---
function executeCinematicEnvelopeOpen() {
    const envelopeScene = document.getElementById('envelopeScene');
    
    envelopeScene.classList.add('open-flap');
    
    setTimeout(() => {
        envelopeScene.classList.add('slide-out-paper');
    }, 700);
    
    setTimeout(() => {
        envelopeScene.style.display = 'none';
        initializeLetterReveal();
    }, 1400);
}

// --- 8. HIGH END EDITORIAL TYPEWRITER RENDERING MATRIX (Extended & Slower Speeds) ---
const letterTextContent = 
`Dear Shahjhan Miss,

This letter is a small token of gratitude for your incredible dedication and warmth. Your patience transforms complex ideas into simple milestones, and your constant support gives us the confidence to reach higher every single day. 

You don't just teach from books; you guide us with heart, setting a brilliant standard of wisdom and elegance that inspires everyone fortunate enough to enter your classroom. 

Every word of advice you share leaves a lasting imprint on our minds, molding us into better learners and better individuals. 

Thank you for being our mentor, our anchor, and our endless source of inspiration. Happy Teacher's Day, Miss!

With deep respect, admiration, and lifelong gratitude,
Your Grateful Student.`; 

function initializeLetterReveal() {
    const letterBox = document.getElementById('premiumLetter');
    const targetNode = document.getElementById('typewriterTarget');
    const hookNode = document.getElementById('dynamicButtonHook');
    
    letterBox.classList.add('unfurled');
    
    setTimeout(() => {
        targetNode.innerHTML = "";
        let currentIndex = 0;
        
        function typeCharacter() {
            if (currentIndex < letterTextContent.length) {
                targetNode.innerHTML += letterTextContent.charAt(currentIndex);
                currentIndex++;
                
                const char = letterTextContent.charAt(currentIndex - 1);
                let structuralDelay = 38;
                if (char === '.') {
                    structuralDelay = 450;
                } else if (char === ',') {
                    structuralDelay = 220;
                }
                
                setTimeout(typeCharacter, structuralDelay);
            } else {
                targetNode.classList.add('printing-done');
                
                hookNode.innerHTML = `
                    <div id="btnWrapper4" class="standard-btn-wrapper">
                        <div id="gifPopup4" class="gif-popup">
                            <p>Play again Miss! 🔄</p>
                            <div class="img-frame">
                                <img id="popupGif4" src="" alt="Game Clip">
                            </div>
                        </div>
                        <button id="loopBtn" class="continue-btn">Loop</button>
                    </div>
                `;
                
                initializeLoopRunaway();
            }
        }
        typeCharacter();
    }, 1200);
}
