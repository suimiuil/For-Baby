let currentQuestion = 1;
let envelopeClicked = false;
let finalScreen = false;
let isLocked = false;

const dateInput = document.getElementById('dateInput');
const envelopeContainer = document.getElementById('envelopeContainer');
const toast = document.getElementById('toast');
const correctFlash = document.getElementById('correctFlash');
const flashImage = document.getElementById('flashImage');

// Question 1: Date selector
dateInput.addEventListener('change', function() {
    if (isLocked) return;
    isLocked = true;
    this.disabled = true;

    const selectedDate = new Date(this.value);
    const correctDate = new Date('2024-06-15');
    
    if (selectedDate.getTime() === correctDate.getTime()) {
        showCorrectFlash();
        setTimeout(() => {
            moveToQuestion(2);
            isLocked = false;
        }, 1000);
    } else {
        showToast('You don\'t love me :(', 'error');
        setTimeout(() => {
            this.value = '';
            this.disabled = false;
            isLocked = false;
        }, 2000);
    }
});

// Question 2: Multiple choice
document.querySelectorAll('#question2 .option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (isLocked) return;
        isLocked = true;
        
        // Disable all buttons
        document.querySelectorAll('#question2 .option-btn').forEach(b => {
            b.disabled = true;
        });

        const answer = this.getAttribute('data-answer');
        
        if (answer === 'Misunderstanding') {
            showCorrectFlash();
            setTimeout(() => {
                moveToQuestion(3);
                isLocked = false;
            }, 1000);
        } else if (answer === 'Gay') {
            showFlashImage();
            setTimeout(() => {
                // Just re-enable buttons, don't reset question
                document.querySelectorAll('#question2 .option-btn').forEach(b => {
                    b.disabled = false;
                });
                isLocked = false;
            }, 2000);
        } else {
            showToast('You don\'t love me :(', 'error');
            setTimeout(() => {
                // Just re-enable buttons, don't reset question
                document.querySelectorAll('#question2 .option-btn').forEach(b => {
                    b.disabled = false;
                });
                isLocked = false;
            }, 2000);
        }
    });
});

// Question 3: Text input
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitName');

function checkNameAnswer() {
    if (isLocked) return;
    isLocked = true;
    nameInput.disabled = true;
    submitBtn.disabled = true;

    const answer = nameInput.value.trim().toLowerCase().replace(/\s+/g, '');
    const correctAnswer = 'baobao';
    
    if (answer === correctAnswer) {
        showCorrectFlash();
        setTimeout(() => {
            showEnvelope();
            isLocked = false;
        }, 1000);
    } else if (answer === 'luke') {
        showToast('Are you mad? :(', 'error');
        setTimeout(() => {
            nameInput.value = '';
            nameInput.disabled = false;
            submitBtn.disabled = false;
            isLocked = false;
        }, 2000);
    } else {
        showToast('You don\'t love me :(', 'error');
        setTimeout(() => {
            nameInput.value = '';
            nameInput.disabled = false;
            submitBtn.disabled = false;
            isLocked = false;
        }, 2000);
    }
}

submitBtn.addEventListener('click', checkNameAnswer);
nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkNameAnswer();
    }
});

// Envelope interaction
envelopeContainer.addEventListener('click', function() {
    if (finalScreen) return;
    
    if (!envelopeClicked) {
        envelopeClicked = true;
        this.classList.remove('slide-up');
        this.classList.add('slide-down');
        
        setTimeout(() => {
            this.classList.remove('slide-down');
            this.classList.add('center');
            
            setTimeout(() => {
                this.classList.add('opening');
                finalScreen = true;
            }, 2000);
        }, 500);
    }
});

function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function showCorrectFlash() {
    correctFlash.style.transition = 'opacity 0.3s ease';
    correctFlash.style.opacity = '0.4';
    setTimeout(() => {
        correctFlash.style.opacity = '0';
    }, 500);
}

function showFlashImage() {
    // You can set a default image URL here or leave it blank
    flashImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2EaKt9mJMVaA-gFhpljj7ZNF417GhQ62J2w&s';
    flashImage.classList.add('show');
    setTimeout(() => {
        flashImage.classList.remove('show');
    }, 2000);
}

function moveToQuestion(questionNum) {
    const currentSection = document.getElementById(`question${currentQuestion}`);
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
        currentSection.style.display = 'none';
        currentQuestion = questionNum;
        const nextSection = document.getElementById(`question${questionNum}`);
        nextSection.style.display = 'block';
        
        // Reset animation
        const question = nextSection.querySelector('.question');
        const answerContainer = nextSection.querySelector('.answer-container');
        question.style.animation = 'none';
        answerContainer.style.animation = 'none';
        answerContainer.classList.remove('active');
        
        setTimeout(() => {
            question.style.animation = 'fadeInDown 1.2s ease-out forwards';
            answerContainer.style.animation = 'fadeInUp 1s ease-out 2s forwards';
            
            // Enable clicking after animation completes
            setTimeout(() => {
                answerContainer.classList.add('active');
            }, 3000);
        }, 50);
    }, 800);
}

function resetQuestion(questionNum) {
    const section = document.getElementById(`question${questionNum}`);
    const question = section.querySelector('.question');
    const answerContainer = section.querySelector('.answer-container');
    
    section.classList.add('fade-out');
    setTimeout(() => {
        section.classList.remove('fade-out');
        question.style.animation = 'none';
        answerContainer.style.animation = 'none';
        
        // Re-enable buttons for question 2
        if (questionNum === 2) {
            document.querySelectorAll('#question2 .option-btn').forEach(b => {
                b.disabled = false;
            });
        }
        
        setTimeout(() => {
            question.style.animation = 'fadeInDown 1.2s ease-out forwards';
            answerContainer.style.animation = 'fadeInUp 1s ease-out 2s forwards';
        }, 50);
    }, 1200);
}

function showEnvelope() {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.classList.add('fade-out');
    
    setTimeout(() => {
        mainContainer.style.display = 'none';
        envelopeContainer.classList.add('slide-up');
    }, 1200);
}

// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 4 + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

setInterval(createHeart, 1000);

// Enable clicking on first question after initial animation
setTimeout(() => {
    document.querySelector('#question1 .answer-container').classList.add('active');
}, 3000);