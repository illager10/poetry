Telegram.WebApp.ready();
Telegram.WebApp.expand();

//----------------------------------------------Блок констнт и объявления перменных-------------------------------------
const overlay = document.getElementById('fadeOverlay');
const container = document.getElementById('novelContainer');

// Объекты сцен
const scenes = {
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

//----------------------------------------------Блок констнт и объявления перменных-------------------------------------

// // Клик по сценам меню
// document.querySelectorAll('.scene-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//         const sceneId = btn.dataset.scene;
//         showScene(sceneId);
//     });
// });

// // Кнопки назад
// document.querySelectorAll('.back-btn').forEach(btn => {
//     btn.addEventListener('click', showMenu);
// });

// Фикс кликов на ПК
document.addEventListener('click', (e) => {
    if (!e.target.closest('.scene-btn, .back-btn')) return;
    e.stopPropagation();
}, true);

// Блокировка скролла в Telegram
document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

// Универсальные обработчики для Telegram (ПК + мобильные)
function addUniversalClick(btn, callback) {
    // 1. Стандартный click (мобильные)
    btn.addEventListener('click', callback);
    
    // 2. Telegram event (ПК/Desktop)
    btn.addEventListener('TelegramGameProxyReady', callback);
    
    // 3. Pointer events (универсально)
    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        callback();
    });
    
    // 4. Touch для гарантии
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        callback();
    }, { passive: false });
}

// Применяем ко всем кнопкам
document.querySelectorAll('.scene-btn, .back-btn').forEach(btn => {
    addUniversalClick(btn, () => {
        const sceneId = btn.dataset.scene;
        if (sceneId) {
            showScene(sceneId);
        } else {
            showMenu();
        }
    });
});

function showScene(sceneId) {
    // 1. Затемнить экран
    overlay.classList.add('fade-in');
    container.classList.add('fade-locked');
    
    setTimeout(() => {
        // 2. Скрыть контент, сменить сцену
        document.querySelectorAll('.scene, #sceneMenu').forEach(el => el.classList.add('hidden'));
        document.getElementById(`scene${sceneId}`).classList.remove('hidden');
        
        // 3. Сменить фон
        document.body.style.backgroundImage = `url('${scenes[sceneId].bg}')`;
        
        // 4. Осветлить и разблокировать
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        container.classList.remove('fade-locked');
    }, 400); // 400ms затемнения
}

function showMenu() {
    overlay.classList.add('fade-in');
    container.classList.add('fade-locked');
    // Скрыть сцены, показать меню
    document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
    document.getElementById('sceneMenu').classList.remove('hidden');

    setTimeout(() => {
        document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
        document.getElementById('sceneMenu').classList.remove('hidden');
        // Вернуть фон меню (опционально)
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/background.jpg')"; // дефолтный фон        
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        container.classList.remove('fade-locked');
    }, 400);
}



