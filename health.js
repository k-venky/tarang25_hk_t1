// Load user data and display
const userData = JSON.parse(localStorage.getItem('wellnessUserData'));
if (userData) {
    document.getElementById('displayName').textContent = userData.name;
    document.getElementById('displayStress').textContent = userData.stressLevel;
}

// Exercise functionality
let exerciseInterval;
let exerciseDuration = 300; // 5 minutes in seconds
let isBreathingIn = true;
let breathingPhaseDuration = 5; // seconds for each breathing phase

function startExercise(exerciseType) {
    // Hide all exercise options
    document.querySelectorAll('.exercise-options .option').forEach(option => {
        option.style.display = 'none';
    });
    
    // Create active exercise container
    const exerciseContainer = document.createElement('div');
    exerciseContainer.className = 'active-exercise';
    exerciseContainer.innerHTML = `
        <h3>${exerciseType} Exercise</h3>
        <div class="exercise-instructions">
            ${getExerciseInstructions(exerciseType)}
        </div>
        <div class="breathing-circle">${isBreathingIn ? 'Breathe In' : 'Breathe Out'}</div>
        <div class="exercise-timer">${formatTime(exerciseDuration)}</div>
        <button class="stop-exercise" onclick="stopExercise()">Stop Exercise</button>
    `;
    
    document.getElementById('exercises').appendChild(exerciseContainer);
    
    // Start the exercise timer
    startExerciseTimer(exerciseType);
}

function getExerciseInstructions(exerciseType) {
    if (exerciseType === 'Deep Breathing') {
        return `
            <p>Follow the circle animation:</p>
            <ul>
                <li>Breathe IN when the circle expands (5 seconds)</li>
                <li>Hold your breath (2 seconds)</li>
                <li>Breathe OUT when the circle contracts (5 seconds)</li>
            </ul>
        `;
    } else if (exerciseType === 'Progressive Relaxation') {
        return `
            <p>We'll guide you through tensing and relaxing each muscle group:</p>
            <ul>
                <li>Tense each muscle group for 5 seconds</li>
                <li>Then relax for 30 seconds</li>
                <li>Notice the difference between tension and relaxation</li>
            </ul>
        `;
    }
    return '';
}

function startExerciseTimer(exerciseType) {
    const breathingCircle = document.querySelector('.breathing-circle');
    const timerElement = document.querySelector('.exercise-timer');
    
    let secondsRemaining = exerciseDuration;
    let breathingCounter = breathingPhaseDuration;
    
    exerciseInterval = setInterval(() => {
        secondsRemaining--;
        breathingCounter--;
        
        // Update main timer
        timerElement.textContent = formatTime(secondsRemaining);
        
        // Handle breathing animation
        if (breathingCounter <= 0) {
            isBreathingIn = !isBreathingIn;
            breathingCounter = breathingPhaseDuration;
            
            if (exerciseType === 'Deep Breathing') {
                // Animate breathing circle
                if (isBreathingIn) {
                    breathingCircle.textContent = 'Breathe In';
                    breathingCircle.style.transform = 'scale(1.2)';
                    breathingCircle.style.backgroundColor = '#3498db';
                } else {
                    breathingCircle.textContent = 'Breathe Out';
                    breathingCircle.style.transform = 'scale(1)';
                    breathingCircle.style.backgroundColor = '#2980b9';
                }
            }
        }
        
        // End exercise when time is up
        if (secondsRemaining <= 0) {
            completeExercise();
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function stopExercise() {
    clearInterval(exerciseInterval);
    document.querySelector('.active-exercise').remove();
    document.querySelectorAll('.exercise-options .option').forEach(option => {
        option.style.display = 'block';
    });
}

function completeExercise() {
    clearInterval(exerciseInterval);
    const exerciseContainer = document.querySelector('.active-exercise');
    
    const completionMessage = document.createElement('div');
    completionMessage.className = 'completion-message';
    completionMessage.textContent = 'Exercise completed! Great job taking time for your wellness.';
    
    exerciseContainer.insertBefore(completionMessage, exerciseContainer.firstChild);
    
    // Remove the exercise after 5 seconds
    setTimeout(() => {
        exerciseContainer.remove();
        document.querySelectorAll('.exercise-options .option').forEach(option => {
            option.style.display = 'block';
        });
    }, 5000);
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    document.querySelectorAll('.tab-buttons button').forEach(button => {
        button.style.background = '#ecf0f1';
        button.style.color = '#2c3e50';
    });
    
    event.target.style.background = '#3498db';
    event.target.style.color = 'white';
}

// Set first tab as active
document.addEventListener('DOMContentLoaded', function() {
    const firstTabButton = document.querySelector('.tab-buttons button');
    if (firstTabButton) {
        firstTabButton.style.background = '#3498db';
        firstTabButton.style.color = 'white';
    }
});