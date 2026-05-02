Telegram.WebApp.ready();
Telegram.WebApp.expand();

//----------------------------------------------Блок констнт и объявления перменных-------------------------------------
const overlay = document.getElementById('fadeOverlay');
const container = document.getElementById('novelContainer');

// Объекты сцен
const scenes = {
    0: {
        bg: 'https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/background.jpg',
        title: 'Главное меню',
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

//----------------------------------------------Блок констнт и объявления перменных-------------------------------------

// Клик по сценам меню
document.querySelectorAll('.scene-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sceneId = btn.dataset.scene;
        showScene(sceneId);
    });
});

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

// Блокировка скролла в Telegram
// document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

// // Универсальные обработчики для Telegram (ПК + мобильные)
// function addUniversalClick(btn, callback) {
//     // 1. Стандартный click (мобильные)
//     btn.addEventListener('click', callback);
    
//     // 2. Telegram event (ПК/Desktop)
//     btn.addEventListener('TelegramGameProxyReady', callback);
    
//     // 3. Pointer events (универсально)
//     btn.addEventListener('pointerdown', (e) => {
//         e.preventDefault();
//         callback();
//     });
    
//     // 4. Touch для гарантии
//     btn.addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         callback();
//     }, { passive: false });
// }

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

    // setTimeout(() => {
    //     document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
    //     document.getElementById('sceneMenu').classList.remove('hidden');
    //     // Вернуть фон меню (опционально)
    //     document.body.style.backgroundImage = `url('${scenes[0].bg}')`; // дефолтный фон        
    //     overlay.classList.remove('fade-in');
    //     overlay.classList.add('fade-out');
    //     container.classList.remove('fade-locked');
    // }, 400);
    overlay.addEventListener('transitionend', function once() {
        document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
        document.getElementById('sceneMenu').classList.remove('hidden');
        document.body.style.backgroundImage = `url('${scenes[0].bg}')`; // дефолтный фон   
        
        // Плавное оттмнение
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        container.classList.remove('fade-locked');
        
        overlay.addEventListener('transitionend', function once2() {
            document.body.style.pointerEvents = 'auto';
            overlay.removeEventListener('transitionend', once2);
        }, { once: true });
        
        overlay.removeEventListener('transitionend', once);
    }, { once: true });
}

function showMenu() {
    document.body.style.pointerEvents = 'none';
    
    overlay.classList.add('fade-in');
    container.classList.add('fade-locked');
    

}



function showScene(sceneId) {
    document.body.style.pointerEvents = 'none';
    
    // Затемнение
    overlay.classList.add('fade-in');
    container.classList.add('fade-locked');
    
    // Ждём окончания затемнения (1.2s)
    overlay.addEventListener('transitionend', function once() {
        // Смена сцены
        document.querySelectorAll('.scene, #sceneMenu').forEach(el => el.classList.add('hidden'));
        document.getElementById(`scene${sceneId}`).classList.remove('hidden');
        document.body.style.backgroundImage = `url('${scenes[sceneId].bg}')`;
        
        // Оттмнение
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        container.classList.remove('fade-locked');
        
        // Ждём окончания оттмнения → разблокировка
        overlay.addEventListener('transitionend', function once2() {
            document.body.style.pointerEvents = 'auto';
            overlay.removeEventListener('transitionend', once2);
        }, { once: true });
        
        overlay.removeEventListener('transitionend', once);
    }, { once: true });
}

