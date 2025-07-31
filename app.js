class RobotGregLearningGame {
    constructor() {
        this.selectedName = null;
        this.currentScreen = 'character-selection';
        this.correctAnswersStreak = 0;
        
        // Enhanced game data with more diverse objects for comparison
        this.gameData = {
            numbers: [
                {digit: 1, name: "ОДИН", items: 1},
                {digit: 2, name: "ДВА", items: 2},
                {digit: 3, name: "ТРИ", items: 3},
                {digit: 4, name: "ЧЕТЫРЕ", items: 4},
                {digit: 5, name: "ПЯТЬ", items: 5},
                {digit: 6, name: "ШЕСТЬ", items: 6},
                {digit: 7, name: "СЕМЬ", items: 7},
                {digit: 8, name: "ВОСЕМЬ", items: 8},
                {digit: 9, name: "ДЕВЯТЬ", items: 9},
                {digit: 10, name: "ДЕСЯТЬ", items: 10}
            ],
            tens: [
                {digit: 10, name: "ДЕСЯТЬ"},
                {digit: 20, name: "ДВАДЦАТЬ"},
                {digit: 30, name: "ТРИДЦАТЬ"},
                {digit: 40, name: "СОРОК"},
                {digit: 50, name: "ПЯТЬДЕСЯТ"},
                {digit: 60, name: "ШЕСТЬДЕСЯТ"},
                {digit: 70, name: "СЕМЬДЕСЯТ"},
                {digit: 80, name: "ВОСЕМЬДЕСЯТ"},
                {digit: 90, name: "ДЕВЯНОСТО"},
                {digit: 100, name: "СТО"}
            ],
            objects: [
                {name: "яблоки", emoji: "🍎", forms: {"1": "яблоко", "2-4": "яблока", "5-10": "яблок"}},
                {name: "звездочки", emoji: "🌟", forms: {"1": "звездочку", "2-4": "звездочки", "5-10": "звездочек"}},
                {name: "шарики", emoji: "🎈", forms: {"1": "шарик", "2-4": "шарика", "5-10": "шариков"}},
                {name: "мячики", emoji: "⚽", forms: {"1": "мячик", "2-4": "мячика", "5-10": "мячей"}},
                {name: "цветочки", emoji: "🌸", forms: {"1": "цветочек", "2-4": "цветочка", "5-10": "цветочков"}},
                {name: "бабочки", emoji: "🦋", forms: {"1": "бабочку", "2-4": "бабочки", "5-10": "бабочек"}},
                {name: "конфетки", emoji: "🍬", forms: {"1": "конфетку", "2-4": "конфетки", "5-10": "конфеток"}},
                {name: "игрушки", emoji: "🧸", forms: {"1": "игрушку", "2-4": "игрушки", "5-10": "игрушек"}},
                {name: "котики", emoji: "🐱", forms: {"1": "котика", "2-4": "котика", "5-10": "котиков"}},
                {name: "машинки", emoji: "🚗", forms: {"1": "машинку", "2-4": "машинки", "5-10": "машинок"}}
            ]
        };
        
        // Game states
        this.gameStates = {
            learnNumbers: { currentNumber: 1, completed: false },
            countObjects: { level: 1 },
            findNumber: { level: 1 },
            simpleExamples: { level: 1, currentProblem: null },
            handwriting: { currentNumber: 1 },
            compareQuantities: { level: 1 },
            learnTens: { currentTen: 10, completed: false },
            tensUnits: { level: 1 }
        };
    }
    
    init() {
        console.log('Initializing Robot Greg Learning Game...');
        this.showScreen('character-selection');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Wait a bit to ensure DOM is fully ready
        setTimeout(() => {
            this.setupCharacterSelection();
            this.setupHomeButtons();
            this.setupGameButtons();
        }, 100);
    }
    
    setupCharacterSelection() {
        console.log('Setting up character selection...');
        
        // Direct event listeners on character buttons
        const characterBtns = document.querySelectorAll('.character-btn');
        console.log('Found character buttons:', characterBtns.length);
        
        characterBtns.forEach((btn, index) => {
            console.log(`Setting up button ${index + 1}:`, btn.getAttribute('data-name'));
            
            // Clear any existing listeners and add new ones
            btn.onclick = null;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const name = btn.getAttribute('data-name');
                console.log('Character button clicked:', name);
                
                if (name) {
                    this.selectCharacter(name);
                }
            });
            
            // Also handle touch events for mobile
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const name = btn.getAttribute('data-name');
                console.log('Character button touched:', name);
                
                if (name) {
                    this.selectCharacter(name);
                }
            });
        });
        
        // Fallback: global click handler for character selection
        document.addEventListener('click', (e) => {
            const characterBtn = e.target.closest('.character-btn');
            if (characterBtn && this.currentScreen === 'character-selection') {
                const name = characterBtn.getAttribute('data-name');
                console.log('Fallback: Character button clicked:', name);
                
                if (name) {
                    this.selectCharacter(name);
                }
            }
        });
    }
    
    selectCharacter(name) {
        console.log('Selecting character:', name);
        this.selectedName = name;
        
        // Update welcome message for main menu
        setTimeout(() => {
            const welcomeMsg = document.getElementById('welcome-message');
            if (welcomeMsg) {
                welcomeMsg.textContent = `Привет, ${name}! Давай учиться! 🤖`;
            }
        }, 100);
        
        // Navigate to main menu immediately
        this.showScreen('main-menu');
    }
    
    setupHomeButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.home-btn')) {
                e.preventDefault();
                this.showScreen('main-menu');
            }
        });
    }
    
    setupGameButtons() {
        document.addEventListener('click', (e) => {
            const gameBtn = e.target.closest('.game-btn');
            if (gameBtn) {
                e.preventDefault();
                const gameId = gameBtn.getAttribute('data-game');
                console.log('Starting game:', gameId);
                this.startGame(gameId);
            }
            
            const settingsBtn = e.target.closest('#settings-btn');
            if (settingsBtn) {
                e.preventDefault();
                this.selectedName = null;  // Reset selected name
                this.showScreen('character-selection');
            }
        });
    }
    
    showScreen(screenId) {
        console.log('Switching to screen:', screenId);
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            console.log('Screen switched successfully to:', screenId);
        } else {
            console.error('Screen not found:', screenId);
        }
    }
    
    startGame(gameId) {
        console.log('Starting game:', gameId);
        this.showScreen(gameId);
        
        // Use setTimeout to ensure screen is shown before initializing game
        setTimeout(() => {
            switch(gameId) {
                case 'learn-numbers':
                    this.initLearnNumbers();
                    break;
                case 'count-objects':
                    this.initCountObjects();
                    break;
                case 'find-number':
                    this.initFindNumber();
                    break;
                case 'simple-examples':
                    this.initSimpleExamples();
                    break;
                case 'handwriting':
                    this.initHandwriting();
                    break;
                case 'compare-quantities':
                    this.initCompareQuantities();
                    break;
                case 'learn-tens':
                    this.initLearnTens();
                    break;
                case 'tens-units':
                    this.initTensUnits();
                    break;
            }
        }, 100);
    }
    
    // Integrated feedback system (no modals)
    showIntegratedFeedback(message, isSuccess = true, screenId = null) {
        const speechElement = this.getSpeechElementForCurrentScreen(screenId);
        const robotHead = this.getRobotHeadForCurrentScreen(screenId);
        
        if (speechElement) {
            // Update speech bubble with feedback
            const originalText = speechElement.textContent;
            speechElement.textContent = message;
            speechElement.parentElement.classList.remove('success', 'error');
            speechElement.parentElement.classList.add(isSuccess ? 'success' : 'error');
            
            // Reset speech bubble after delay
            setTimeout(() => {
                speechElement.parentElement.classList.remove('success', 'error');
                // Don't restore original text for persistent feedback
            }, 3000);
        }
        
        if (robotHead) {
            // Animate robot head
            robotHead.classList.remove('happy', 'excited');
            robotHead.classList.add(isSuccess ? 'happy' : 'excited');
            
            // Reset robot head animation after delay
            setTimeout(() => {
                robotHead.classList.remove('happy', 'excited');
            }, 1500);
        }
    }
    
    getSpeechElementForCurrentScreen(screenId = null) {
        const currentScreenId = screenId || this.currentScreen;
        const speechElementIds = {
            'learn-numbers': 'learn-numbers-speech',
            'count-objects': 'count-objects-speech',
            'find-number': 'find-number-speech',
            'simple-examples': 'simple-examples-speech',
            'handwriting': 'handwriting-speech',
            'compare-quantities': 'compare-speech',
            'learn-tens': 'learn-tens-speech',
            'tens-units': 'tens-units-speech'
        };
        
        const elementId = speechElementIds[currentScreenId];
        return elementId ? document.getElementById(elementId) : null;
    }
    
    getRobotHeadForCurrentScreen(screenId = null) {
        const currentScreenId = screenId || this.currentScreen;
        const currentScreenElement = document.getElementById(currentScreenId);
        if (currentScreenElement) {
            return currentScreenElement.querySelector('.robot-head');
        }
        return null;
    }
    
    // Learn Numbers Game
    initLearnNumbers() {
        console.log('Initializing Learn Numbers game');
        this.gameStates.learnNumbers.currentNumber = 1;
        this.gameStates.learnNumbers.completed = false;
        this.updateLearnNumbers();
        this.updateSpeech('learn-numbers-speech', `Давай изучим цифру 1, ${this.selectedName}!`);
    }
    
    updateLearnNumbers() {
        const currentNumberEl = document.getElementById('current-number');
        const counterEl = document.getElementById('number-counter');
        const prevBtn = document.getElementById('prev-number');
        const nextBtn = document.getElementById('next-number');
        
        const currentNumber = this.gameStates.learnNumbers.currentNumber;
        
        if (currentNumberEl) {
            currentNumberEl.textContent = currentNumber;
            currentNumberEl.onclick = () => this.speakNumber(currentNumber);
        }
        
        if (counterEl) {
            counterEl.textContent = `${currentNumber} из 10`;
        }
        
        if (prevBtn) {
            prevBtn.disabled = currentNumber === 1;
            prevBtn.onclick = () => {
                if (currentNumber > 1) {
                    this.gameStates.learnNumbers.currentNumber--;
                    this.updateLearnNumbers();
                }
            };
        }
        
        if (nextBtn) {
            nextBtn.textContent = currentNumber === 10 ? "Завершить" : "Вперед ▶";
            nextBtn.onclick = () => {
                if (currentNumber < 10) {
                    this.gameStates.learnNumbers.currentNumber++;
                    this.updateLearnNumbers();
                } else {
                    this.completeLearnNumbers();
                }
            };
        }
        
        this.updateSpeech('learn-numbers-speech', `Изучаем цифру ${currentNumber}, ${this.selectedName}! Нажми на неё!`);
    }
    
    speakNumber(number) {
        const numberData = this.gameData.numbers.find(n => n.digit === number);
        if (numberData) {
            this.showIntegratedFeedback(`Это цифра ${number} - ${numberData.name}!`, true, 'learn-numbers');
        }
    }
    
    completeLearnNumbers() {
        this.gameStates.learnNumbers.completed = true;
        const repeatBtn = document.getElementById('repeat-numbers');
        if (repeatBtn) {
            repeatBtn.classList.remove('hidden');
            repeatBtn.onclick = () => {
                this.gameStates.learnNumbers.currentNumber = 1;
                this.gameStates.learnNumbers.completed = false;
                this.updateLearnNumbers();
                repeatBtn.classList.add('hidden');
            };
        }
        this.showIntegratedFeedback(`Отлично, ${this.selectedName}! Ты изучил все цифры!`, true, 'learn-numbers');
    }
    
    // Count Objects Game
    initCountObjects() {
        console.log('Initializing Count Objects game');
        this.gameStates.countObjects.level = 1;
        this.generateCountObjectsLevel();
    }
    
    generateCountObjectsLevel() {
        const container = document.getElementById('objects-container');
        const answersContainer = document.getElementById('count-answers');
        const progress = document.getElementById('count-progress');
        
        if (!container || !answersContainer) {
            console.error('Count objects containers not found');
            return;
        }
        
        const correctCount = Math.floor(Math.random() * 10) + 1;
        const objectType = this.gameData.objects[Math.floor(Math.random() * this.gameData.objects.length)];
        
        // Clear container
        container.innerHTML = '';
        
        // Add objects
        for (let i = 0; i < correctCount; i++) {
            const objEl = document.createElement('div');
            objEl.className = 'object-item';
            objEl.textContent = objectType.emoji;
            objEl.style.animationDelay = `${i * 0.1}s`;
            container.appendChild(objEl);
        }
        
        // Generate answer buttons
        this.generateAnswerButtons(answersContainer, correctCount, (selected) => {
            this.handleCountObjectsAnswer(selected, correctCount, objectType);
        }, 'count-objects');
        
        if (progress) {
            progress.textContent = `Задание ${this.gameStates.countObjects.level}`;
        }
        
        this.updateSpeech('count-objects-speech', `Посчитай предметы, ${this.selectedName}! Сколько здесь ${this.getObjectForm(correctCount, objectType)}?`);
    }
    
    handleCountObjectsAnswer(selected, correct, objectType) {
        if (selected === correct) {
            this.showIntegratedFeedback(`Отлично, ${this.selectedName}! Правильно!`, true, 'count-objects');
            this.correctAnswersStreak++;
            this.gameStates.countObjects.level++;
            setTimeout(() => {
                this.generateCountObjectsLevel();
            }, 2000);
        } else {
            this.showIntegratedFeedback(`Попробуй еще раз, ${this.selectedName}! Здесь ${correct} ${this.getObjectForm(correct, objectType)}`, false, 'count-objects');
            this.correctAnswersStreak = 0;
        }
    }
    
    // Find Number Game
    initFindNumber() {
        console.log('Initializing Find Number game');
        this.gameStates.findNumber.level = 1;
        this.generateFindNumberLevel();
    }
    
    generateFindNumberLevel() {
        const grid = document.getElementById('numbers-grid');
        const progress = document.getElementById('find-progress');
        
        if (!grid) return;
        
        const targetNumber = this.getWeightedRandomNumber();
        const targetData = this.gameData.numbers.find(n => n.digit === targetNumber);
        const numbers = [targetNumber];
        
        // Generate 8 more random numbers
        while (numbers.length < 9) {
            const num = Math.floor(Math.random() * 10) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        
        this.shuffleArray(numbers);
        
        // Update speech
        this.updateSpeech('find-number-speech', `Найди цифру ${targetData.name}, ${this.selectedName}!`);
        
        // Create grid
        grid.innerHTML = '';
        numbers.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'number-btn';
            btn.textContent = num;
            btn.addEventListener('click', () => {
                this.handleFindNumberAnswer(num, targetNumber, btn);
            });
            grid.appendChild(btn);
        });
        
        if (progress) {
            progress.textContent = `Задание ${this.gameStates.findNumber.level}`;
        }
    }
    
    getWeightedRandomNumber() {
        const weights = [0.15, 0.15, 0.15, 0.15, 0.15, 0.10, 0.10, 0.10, 0.03, 0.02];
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < weights.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return i + 1;
            }
        }
        return 1;
    }
    
    handleFindNumberAnswer(selected, correct, buttonElement) {
        if (selected === correct) {
            buttonElement.classList.add('correct');
            this.showIntegratedFeedback(`Молодец, ${this.selectedName}! Правильно найден!`, true, 'find-number');
            this.correctAnswersStreak++;
            this.gameStates.findNumber.level++;
            setTimeout(() => {
                this.generateFindNumberLevel();
            }, 2000);
        } else {
            buttonElement.classList.add('incorrect');
            this.showIntegratedFeedback(`Попробуй еще раз, ${this.selectedName}! Ищем ${this.gameData.numbers.find(n => n.digit === correct)?.name}`, false, 'find-number');
            this.correctAnswersStreak = 0;
        }
    }
    
    // Simple Examples Game - FIXED VERSION with proper retry logic
    initSimpleExamples() {
        console.log('Initializing Simple Examples game');
        this.gameStates.simpleExamples.level = 1;
        this.gameStates.simpleExamples.currentProblem = null;
        this.generateSimpleExamplesLevel();
    }
    
    generateSimpleExamplesLevel() {
        const problemText = document.getElementById('problem-text');
        const visualMath = document.getElementById('visual-math');
        const equation = document.getElementById('math-equation');
        const answersContainer = document.getElementById('examples-answers');
        const progress = document.getElementById('examples-progress');
        
        if (!problemText || !visualMath || !equation || !answersContainer) return;
        
        const isAddition = Math.random() > 0.3;
        let a, b, result, operation;
        
        if (isAddition) {
            a = Math.floor(Math.random() * 6) + 1;
            b = Math.floor(Math.random() * (11 - a));
            result = a + b;
            operation = '+';
        } else {
            a = Math.floor(Math.random() * 9) + 2;
            b = Math.floor(Math.random() * a) + 1;
            result = a - b;
            operation = '-';
        }
        
        const objectType = this.gameData.objects[Math.floor(Math.random() * this.gameData.objects.length)];
        
        // Store current problem for retry functionality
        this.gameStates.simpleExamples.currentProblem = {
            a, b, result, operation, objectType, isAddition
        };
        
        // Generate problem text with correct grammar
        let problemTextContent;
        if (isAddition) {
            problemTextContent = `У нас было ${a} ${this.getObjectForm(a, objectType)}, добавили ${b} ${this.getObjectForm(b, objectType)}. Сколько стало?`;
        } else {
            problemTextContent = `У нас было ${a} ${this.getObjectForm(a, objectType)}, забрали ${b}. Сколько осталось?`;
        }
        
        problemText.textContent = problemTextContent;
        
        // Visual representation
        visualMath.innerHTML = '';
        
        if (a > 0) {
            const group1 = document.createElement('div');
            group1.className = 'visual-group';
            for (let i = 0; i < a; i++) {
                const item = document.createElement('div');
                item.className = 'object-item';
                item.textContent = objectType.emoji;
                group1.appendChild(item);
            }
            visualMath.appendChild(group1);
        }
        
        if (b > 0) {
            const operator = document.createElement('div');
            operator.className = 'math-operator';
            operator.textContent = operation;
            visualMath.appendChild(operator);
            
            const group2 = document.createElement('div');
            group2.className = 'visual-group';
            for (let i = 0; i < b; i++) {
                const item = document.createElement('div');
                item.className = 'object-item';
                item.textContent = objectType.emoji;
                group2.appendChild(item);
            }
            visualMath.appendChild(group2);
        }
        
        equation.textContent = `${a} ${operation} ${b} = ?`;
        
        this.generateAnswerButtons(answersContainer, result, (selected, buttonElement) => {
            this.handleSimpleExamplesAnswer(selected, result, buttonElement);
        }, 'simple-examples');
        
        if (progress) {
            progress.textContent = `Пример ${this.gameStates.simpleExamples.level}`;
        }
        
        this.updateSpeech('simple-examples-speech', `Реши пример, ${this.selectedName}!`);
    }
    
    handleSimpleExamplesAnswer(selected, correct, buttonElement) {
        if (selected === correct) {
            buttonElement.classList.add('correct');
            this.showIntegratedFeedback(`Правильно, ${this.selectedName}! Ответ ${correct}!`, true, 'simple-examples');
            this.correctAnswersStreak++;
            this.gameStates.simpleExamples.level++;
            
            // Disable all buttons after correct answer
            const answersContainer = document.getElementById('examples-answers');
            if (answersContainer) {
                answersContainer.querySelectorAll('.answer-btn').forEach(btn => {
                    btn.disabled = true;
                });
            }
            
            setTimeout(() => {
                this.generateSimpleExamplesLevel();
            }, 2000);
        } else {
            // Mark this button as incorrect and disable it
            buttonElement.classList.add('incorrect');
            buttonElement.disabled = true;
            
            this.showIntegratedFeedback(`Не расстраивайся, ${this.selectedName}! Попробуй другой вариант!`, false, 'simple-examples');
            this.correctAnswersStreak = 0;
            
            // Check if all wrong answers have been tried
            const answersContainer = document.getElementById('examples-answers');
            if (answersContainer) {
                const allButtons = answersContainer.querySelectorAll('.answer-btn');
                const disabledButtons = answersContainer.querySelectorAll('.answer-btn:disabled');
                const correctButtons = answersContainer.querySelectorAll('.answer-btn.correct');
                
                // If all buttons except the correct one are disabled, give hint and re-enable
                if (disabledButtons.length === allButtons.length - 1 && correctButtons.length === 0) {
                    setTimeout(() => {
                        this.showIntegratedFeedback(`Попробуй найти ответ ${correct}, ${this.selectedName}!`, false, 'simple-examples');
                        
                        // Re-enable all buttons for final attempt
                        allButtons.forEach(btn => {
                            btn.disabled = false;
                            btn.classList.remove('incorrect');
                        });
                    }, 1500);
                }
            }
        }
    }
    
    // Handwriting Game
    initHandwriting() {
        console.log('Initializing Handwriting game');
        this.gameStates.handwriting.currentNumber = 1;
        this.setupCanvas();
        this.updateHandwriting();
        
        // Set up button listeners
        const clearBtn = document.getElementById('clear-canvas');
        const nextBtn = document.getElementById('next-handwriting');
        
        if (clearBtn) {
            clearBtn.onclick = () => this.clearCanvas();
        }
        
        if (nextBtn) {
            nextBtn.onclick = () => {
                if (this.gameStates.handwriting.currentNumber < 10) {
                    this.gameStates.handwriting.currentNumber++;
                } else {
                    this.gameStates.handwriting.currentNumber = 1;
                }
                this.updateHandwriting();
            };
        }
    }
    
    setupCanvas() {
        const canvas = document.getElementById('drawing-canvas');
        if (!canvas) {
            console.error('Canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        
        // Set canvas properties
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Mouse events
        canvas.onmousedown = (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        };
        
        canvas.onmousemove = (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
        };
        
        canvas.onmouseup = () => {
            isDrawing = false;
            this.praiseDrawing();
        };
        
        // Touch events for mobile
        canvas.ontouchstart = (e) => {
            e.preventDefault();
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            ctx.beginPath();
            ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
        };
        
        canvas.ontouchmove = (e) => {
            e.preventDefault();
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
            ctx.stroke();
        };
        
        canvas.ontouchend = (e) => {
            e.preventDefault();
            isDrawing = false;
            this.praiseDrawing();
        };
    }
    
    updateHandwriting() {
        const example = document.getElementById('number-example');
        const counter = document.getElementById('handwriting-counter');
        
        if (example) {
            example.textContent = this.gameStates.handwriting.currentNumber;
        }
        
        if (counter) {
            counter.textContent = `Цифра ${this.gameStates.handwriting.currentNumber} из 10`;
        }
        
        this.updateSpeech('handwriting-speech', `Нарисуй цифру ${this.gameStates.handwriting.currentNumber}, ${this.selectedName}!`);
        this.clearCanvas();
    }
    
    clearCanvas() {
        const canvas = document.getElementById('drawing-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    praiseDrawing() {
        const praises = [
            `Красивая цифра получается, ${this.selectedName}!`,
            `Отлично пишешь, ${this.selectedName}!`,
            `Хорошо получается, ${this.selectedName}!`,
            `Продолжай, ${this.selectedName}!`
        ];
        const praise = praises[Math.floor(Math.random() * praises.length)];
        this.showIntegratedFeedback(praise, true, 'handwriting');
    }
    
    // Compare Quantities Game
    initCompareQuantities() {
        console.log('Initializing Compare Quantities game');
        this.gameStates.compareQuantities.level = 1;
        this.generateCompareQuantitiesLevel();
    }
    
    generateCompareQuantitiesLevel() {
        const leftGroup = document.getElementById('left-group');
        const rightGroup = document.getElementById('right-group');
        const progress = document.getElementById('compare-progress');
        
        if (!leftGroup || !rightGroup) {
            console.error('Comparison groups not found');
            return;
        }
        
        const leftCount = Math.floor(Math.random() * 8) + 1;
        const rightCount = Math.floor(Math.random() * 8) + 1;
        
        const leftObjectType = this.gameData.objects[Math.floor(Math.random() * this.gameData.objects.length)];
        let rightObjectType = this.gameData.objects[Math.floor(Math.random() * this.gameData.objects.length)];
        
        while (rightObjectType.emoji === leftObjectType.emoji) {
            rightObjectType = this.gameData.objects[Math.floor(Math.random() * this.gameData.objects.length)];
        }
        
        // Clear groups
        leftGroup.innerHTML = '';
        rightGroup.innerHTML = '';
        
        // Fill left group
        for (let i = 0; i < leftCount; i++) {
            const item = document.createElement('div');
            item.className = 'object-item';
            item.textContent = leftObjectType.emoji;
            item.style.animationDelay = `${i * 0.1}s`;
            leftGroup.appendChild(item);
        }
        
        // Fill right group
        for (let i = 0; i < rightCount; i++) {
            const item = document.createElement('div');
            item.className = 'object-item';
            item.textContent = rightObjectType.emoji;
            item.style.animationDelay = `${i * 0.1}s`;
            rightGroup.appendChild(item);
        }
        
        // Setup comparison buttons
        this.setupComparisonButtons(leftCount, rightCount, leftObjectType, rightObjectType);
        
        if (progress) {
            progress.textContent = `Задание ${this.gameStates.compareQuantities.level}`;
        }
        
        const questionTypes = [
            'Где больше предметов?',
            'Где меньше предметов?',
            'Одинаково ли предметов?'
        ];
        const question = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        this.updateSpeech('compare-speech', `${question} ${this.selectedName}!`);
    }
    
    setupComparisonButtons(leftCount, rightCount, leftObjectType, rightObjectType) {
        const leftMoreBtn = document.getElementById('left-more');
        const equalBtn = document.getElementById('equal');
        const rightMoreBtn = document.getElementById('right-more');
        
        if (leftMoreBtn) {
            leftMoreBtn.onclick = () => {
                this.handleComparisonAnswer('left', leftCount, rightCount, leftObjectType, rightObjectType);
            };
        }
        
        if (equalBtn) {
            equalBtn.onclick = () => {
                this.handleComparisonAnswer('equal', leftCount, rightCount, leftObjectType, rightObjectType);
            };
        }
        
        if (rightMoreBtn) {
            rightMoreBtn.onclick = () => {
                this.handleComparisonAnswer('right', leftCount, rightCount, leftObjectType, rightObjectType);
            };
        }
    }
    
    handleComparisonAnswer(selected, leftCount, rightCount, leftObjectType, rightObjectType) {
        let correct = false;
        let explanation = '';
        
        if (leftCount > rightCount && selected === 'left') {
            correct = true;
            explanation = `Да, ${this.selectedName}! Слева ${leftCount} ${leftObjectType.emoji}, справа ${rightCount} ${rightObjectType.emoji}. Слева больше!`;
        } else if (rightCount > leftCount && selected === 'right') {
            correct = true;
            explanation = `Да, ${this.selectedName}! Справа ${rightCount} ${rightObjectType.emoji}, слева ${leftCount} ${leftObjectType.emoji}. Справа больше!`;
        } else if (leftCount === rightCount && selected === 'equal') {
            correct = true;
            explanation = `Да, ${this.selectedName}! И слева, и справа по ${leftCount}. Поровну!`;
        } else {
            if (leftCount > rightCount) {
                explanation = `Нет, ${this.selectedName}! Слева ${leftCount}, справа ${rightCount}. Слева больше!`;
            } else if (rightCount > leftCount) {
                explanation = `Нет, ${this.selectedName}! Справа ${rightCount}, слева ${leftCount}. Справа больше!`;
            } else {
                explanation = `Нет, ${this.selectedName}! Слева и справа поровну - по ${leftCount}!`;
            }
        }
        
        this.showIntegratedFeedback(explanation, correct, 'compare-quantities');
        
        if (correct) {
            this.correctAnswersStreak++;
            this.gameStates.compareQuantities.level++;
            setTimeout(() => {
                this.generateCompareQuantitiesLevel();
            }, 3000);
        } else {
            this.correctAnswersStreak = 0;
        }
    }
    
    // Learn Tens Game
    initLearnTens() {
        console.log('Initializing Learn Tens game');
        this.gameStates.learnTens.currentTen = 10;
        this.gameStates.learnTens.completed = false;
        this.updateLearnTens();
    }
    
    updateLearnTens() {
        const currentTenEl = document.getElementById('current-ten');
        const counterEl = document.getElementById('tens-counter');
        const prevBtn = document.getElementById('prev-ten');
        const nextBtn = document.getElementById('next-ten');
        const visualization = document.getElementById('tens-visualization');
        
        const currentTen = this.gameStates.learnTens.currentTen;
        
        if (currentTenEl) {
            currentTenEl.textContent = currentTen;
            currentTenEl.onclick = () => this.speakTen(currentTen);
        }
        
        if (counterEl) {
            counterEl.textContent = `${currentTen} из 100`;
        }
        
        if (prevBtn) {
            prevBtn.disabled = currentTen === 10;
            prevBtn.onclick = () => {
                if (currentTen > 10) {
                    this.gameStates.learnTens.currentTen -= 10;
                    this.updateLearnTens();
                }
            };
        }
        
        if (nextBtn) {
            nextBtn.textContent = currentTen === 100 ? "Завершить" : "Вперед ▶";
            nextBtn.onclick = () => {
                if (currentTen < 100) {
                    this.gameStates.learnTens.currentTen += 10;
                    this.updateLearnTens();
                } else {
                    this.completeLearnTens();
                }
            };
        }
        
        // Update visualization
        if (visualization) {
            visualization.innerHTML = '';
            const groups = currentTen / 10;
            
            for (let g = 0; g < groups; g++) {
                const group = document.createElement('div');
                group.className = 'tens-group';
                
                for (let i = 0; i < 10; i++) {
                    const unit = document.createElement('div');
                    unit.className = 'tens-unit';
                    unit.style.animationDelay = `${(g * 10 + i) * 0.05}s`;
                    group.appendChild(unit);
                }
                
                visualization.appendChild(group);
            }
        }
        
        this.updateSpeech('learn-tens-speech', `Изучаем число ${currentTen}, ${this.selectedName}! ${currentTen / 10} десяток${currentTen === 10 ? '' : 'ов'} = ${currentTen} единиц!`);
    }
    
    speakTen(ten) {
        const tenData = this.gameData.tens.find(t => t.digit === ten);
        if (tenData) {
            this.showIntegratedFeedback(`Это число ${ten} - ${tenData.name}!`, true, 'learn-tens');
        }
    }
    
    completeLearnTens() {
        this.gameStates.learnTens.completed = true;
        const repeatBtn = document.getElementById('repeat-tens');
        if (repeatBtn) {
            repeatBtn.classList.remove('hidden');
            repeatBtn.onclick = () => {
                this.gameStates.learnTens.currentTen = 10;
                this.gameStates.learnTens.completed = false;
                this.updateLearnTens();
                repeatBtn.classList.add('hidden');
            };
        }
        this.showIntegratedFeedback(`Отлично, ${this.selectedName}! Ты изучил все десятки!`, true, 'learn-tens');
    }
    
    // Tens + Units Game
    initTensUnits() {
        console.log('Initializing Tens Units game');
        this.gameStates.tensUnits.level = 1;
        this.generateTensUnitsLevel();
        
        const generateBtn = document.getElementById('generate-tens-units');
        if (generateBtn) {
            generateBtn.onclick = () => {
                this.gameStates.tensUnits.level++;
                this.generateTensUnitsLevel();
            };
        }
    }
    
    generateTensUnitsLevel() {
        const tensSection = document.getElementById('tens-section');
        const unitsSection = document.getElementById('units-section');
        const resultNumber = document.getElementById('result-number');
        const counter = document.getElementById('tens-units-counter');
        
        if (!tensSection || !unitsSection || !resultNumber) return;
        
        const tens = Math.floor(Math.random() * 9) + 1; // 1-9 tens
        const units = Math.floor(Math.random() * 10); // 0-9 units
        const totalNumber = tens * 10 + units;
        
        // Clear sections
        tensSection.innerHTML = '';
        unitsSection.innerHTML = '';
        
        // Create tens groups
        for (let t = 0; t < tens; t++) {
            const tensGroup = document.createElement('div');
            tensGroup.className = 'tens-group';
            
            for (let i = 0; i < 10; i++) {
                const unit = document.createElement('div');
                unit.className = 'tens-unit';
                unit.style.animationDelay = `${(t * 10 + i) * 0.02}s`;
                tensGroup.appendChild(unit);
            }
            
            tensSection.appendChild(tensGroup);
        }
        
        // Create units group
        if (units > 0) {
            const unitsGroup = document.createElement('div');
            unitsGroup.className = 'units-group';
            
            for (let i = 0; i < units; i++) {
                const unit = document.createElement('div');
                unit.className = 'tens-unit';
                unit.style.animationDelay = `${(tens * 10 + i) * 0.02}s`;
                unitsGroup.appendChild(unit);
            }
            
            unitsSection.appendChild(unitsGroup);
        }
        
        resultNumber.textContent = totalNumber;
        
        if (counter) {
            counter.textContent = `Число ${this.gameStates.tensUnits.level}`;
        }
        
        const tensName = this.gameData.tens.find(t => t.digit === tens * 10)?.name.toLowerCase() || `${tens * 10}`;
        const unitsName = units > 0 ? ` и ${units} единиц${units === 1 ? 'а' : ''}` : '';
        
        this.updateSpeech('tens-units-speech', `Собери число, ${this.selectedName}! ${tens} десяток${tens === 1 ? '' : 'ов'}${unitsName} = ${this.numberToWords(totalNumber)}!`);
    }
    
    // Helper functions
    generateAnswerButtons(container, correctAnswer, callback, gameType = null) {
        const answers = [correctAnswer];
        
        // Generate wrong answers
        while (answers.length < 4) {
            let wrong;
            if (correctAnswer <= 5) {
                wrong = Math.floor(Math.random() * 8);
            } else {
                wrong = Math.floor(Math.random() * 15);
            }
            
            if (!answers.includes(wrong) && wrong >= 0) {
                answers.push(wrong);
            }
        }
        
        this.shuffleArray(answers);
        
        container.innerHTML = '';
        answers.forEach(answer => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = answer;
            btn.addEventListener('click', () => {
                // For simple-examples, pass the button element for individual handling
                if (gameType === 'simple-examples') {
                    callback(answer, btn);
                } else {
                    // For other games, mark correct/incorrect and disable all
                    if (answer === correctAnswer) {
                        btn.classList.add('correct');
                    } else {
                        btn.classList.add('incorrect');
                    }
                    
                    // Disable all buttons for non-simple-examples games
                    container.querySelectorAll('.answer-btn').forEach(b => {
                        b.disabled = true;
                    });
                    
                    callback(answer);
                }
            });
            container.appendChild(btn);
        });
    }
    
    getObjectForm(count, objectType) {
        if (count === 1) {
            return objectType.forms["1"];
        } else if (count >= 2 && count <= 4) {
            return objectType.forms["2-4"];
        } else {
            return objectType.forms["5-10"];
        }
    }
    
    numberToWords(num) {
        const ones = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
        const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
        const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
        
        if (num === 0) return "ноль";
        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) {
            const tensDigit = Math.floor(num / 10);
            const onesDigit = num % 10;
            return tens[tensDigit] + (onesDigit > 0 ? " " + ones[onesDigit] : "");
        }
        if (num === 100) return "сто";
        
        return num.toString();
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    updateSpeech(elementId, message) {
        const speechEl = document.getElementById(elementId);
        if (speechEl) {
            speechEl.textContent = message;
        }
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new RobotGregLearningGame();
    game.init();
    
    // Make game accessible globally for debugging
    window.robotGregGame = game;
});