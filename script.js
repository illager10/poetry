Telegram.WebApp.ready();
Telegram.WebApp.expand();

//----------------------------------------------Блок констант и объявления перменных-------------------------------------\\
const overlay       = document.getElementById('fadeOverlay');
const container     = document.getElementById('novelContainer');
const menu_id = 0;

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

function playSceneAudio(sceneId) {
    // Остановить текущий
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Новый трек
    currentAudio = audio[sceneId];
    currentAudio.volume = 0.3; // Громкость 30%
    currentAudio.play().catch(e => console.log('Audio autoplay blocked:', e));
}


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

document.addEventListener('click', () => {
    if (currentScene === 0) playSceneAudio(menu_id);
}, { once: true });

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

        playSceneAudio(menu_id);

        overlay.classList.remove('fade-in');
    }, 400);
}
