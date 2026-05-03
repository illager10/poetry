Telegram.WebApp.ready();
Telegram.WebApp.expand();

//----------------------------------------------Блок констант и объявления перменных-------------------------------------\\
const overlay       = document.getElementById('fadeOverlay');
const container     = document.getElementById('novelContainer');
const menu_id = 0;


//Элементы верхнего меню
const soundBtn = document.getElementById('soundToggle');
const soundImg = soundBtn.querySelector('img');


// Элементы настроек
const settingsModal      = document.getElementById('settingsModal'     );
const closeSettings      = document.getElementById('closeSettings'     );
const volumeSlider       = document.getElementById('volumeSlider'      );
const volumeValue        = document.getElementById('volumeValue'       );
const settingsBtn        = document.getElementById('settingsBtn'       );
const SettingSoundToggle = document.getElementById('SettingSoundToggle');
const soundSettingImg    = SettingSoundToggle.querySelector('img');

// Аудио объекты
const audio = {
    0: document.getElementById('audio-menu'),
    1: document.getElementById('audio-scene1'),
    2: document.getElementById('audio-scene2'),
    3: document.getElementById('audio-scene3')
};

// Объекты сцен
const scenes = {
    0: {
        bg: 'https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/background.jpg',
        title: 'Ночной особняк',
        text: 'Ты стоишь перед тёмным особняком. Луна освещает его острые шпили...'
    },
    1: {
        bg: 'https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/scene1.jpg',
        title: 'Ночной особняк',
        text: 'Ты стоишь перед тёмным особняком. Луна освещает его острые шпили...'
    },
    2: {
        bg: 'https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/scene2.jpg',
        title: 'Дождливый лес',
        text: 'Дождь хлещет по листьям. Вдали слышен вой волков...'
    },
    3: {
        bg: 'https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/scene1.jpg',
        title: 'Заброшенный замок',
        text: 'Ветер завывает в пустых коридорах. Что-то шевелится в тени...'
    }
};

//----------------------------------------------Блок музыкального сопровождения-------------------------------------\\

let currentAudio = audio[0]; // Текущий трек
let musicEnabled = true;

soundBtn.addEventListener('click', toggleSound);

function playSceneAudio(sceneId) {  
    // Остановить текущий
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Новый трек
    currentAudio = audio[sceneId];
    if (!musicEnabled) return;

    currentAudio.play().catch(e => console.log('Audio autoplay blocked:', e));
}

function toggleSound() {
    musicEnabled = !musicEnabled;
    
    if (!musicEnabled) {
        if (currentAudio) currentAudio.pause();
        soundBtn.classList.add('sound-off');
        soundImg.src = 'https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/music_off_icon.png';
        soundImg.alt = '🔇';
        soundSettingImg.classList.add('sound-off');
        soundSettingImg.src = soundImg.src;
        soundSettingImg.alt = soundImg.alt;
    } else {
        if (currentAudio) {
            currentAudio.play().catch(e => console.log('Audio autoplay blocked:', e));
        }
        soundBtn.classList.remove('sound-off');
        soundImg.src = 'https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/music_on_icon.png';
        soundImg.alt = '🔊';
        soundSettingImg.classList.remove('sound-off');
        soundSettingImg.src = soundImg.src;
        soundSettingImg.alt = soundImg.alt;
    }

    Telegram.WebApp.HapticFeedback.impactOccurred('light');
}

//----------------------------------------------Блок расширенных настрокек -------------------------------------\\



// Открытие настроек
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
    Telegram.WebApp.HapticFeedback.impactOccurred('medium');
});

// Закрытие
closeSettings.addEventListener('click', closeSettingsModal);
document.querySelector('.settings-overlay').addEventListener('click', closeSettingsModal);

function closeSettingsModal() {
    settingsModal.classList.add('hidden');
    Telegram.WebApp.HapticFeedback.impactOccurred('light');
}

SettingSoundToggle.addEventListener('click', toggleSound);
// Toggle музыки  Для slider, не для конпки
// SettingSoundToggle.addEventListener('change', (e) => {
//     musicEnabled = e.target.checked; 
//     toggleSound(); // Ваша функция
// });

// Ползунок громкости
volumeSlider.addEventListener('input', (e) => {
    const vol = e.target.value / 100;
    if (currentAudio) {
        currentAudio.volume = vol;
    }
    volumeValue.textContent = e.target.value + '%';
});

// Инициализация значений
// musicCheckbox.checked = musicEnabled; -- Для slider, не для конпки
volumeSlider.value = currentAudio ? Math.round(currentAudio.volume * 100) : 30;
volumeValue.textContent = volumeSlider.value + '%';

// Кнопка сохранить = закрыть
document.querySelector('.save-btn').addEventListener('click', () => {
    closeSettingsModal();
    Telegram.WebApp.HapticFeedback.impactOccurred('light');
});

//----------------------------------------------Блок кнопок и переходов и объявления перменных-------------------------------------\\

// Клик по сценам меню
document.querySelectorAll('.scene-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sceneId = btn.dataset.scene;
        showScene(sceneId);
    });
});

// Кнопки назад
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', showMenu);
});

function showScene(sceneId) {
    // 1. Затемнить экран
    overlay.classList.add('fade-in');
    
    setTimeout(() => {
        // 2. Скрыть контент, сменить сцену
        document.querySelectorAll('.scene, #sceneMenu').forEach(el => el.classList.add('hidden'));
        document.getElementById(`scene${sceneId}`).classList.remove('hidden');
        
        // 3. Сменить фон
        document.body.style.backgroundImage = `url('${scenes[sceneId].bg}')`;
        
        // 4. Осветлить и разблокировать
        overlay.classList.remove('fade-in');
        playSceneAudio(sceneId);
      }, 400); // 400ms затемнения
}


function showMenu() {

    overlay.classList.add('fade-in');    
    
    setTimeout(() => {
        // Скрыть сцены, показать меню
        document.querySelectorAll('.scene, #sceneMenu').forEach(el => el.classList.add('hidden'));
        document.getElementById('sceneMenu').classList.remove('hidden');
        // Вернуть фон меню (опционально)
        document.body.style.backgroundImage = `url('${scenes[menu_id].bg}')`; // основной фон   
        
        overlay.classList.remove('fade-in');
        playSceneAudio(menu_id);
    }, 400);
}
