Telegram.WebApp.ready();
Telegram.WebApp.expand();

//----------------------------------------------Блок констнт и объявления перменных-------------------------------------
const overlay       = document.getElementById('fadeOverlay');
const container     = document.getElementById('novelContainer');
const background_id = 0;

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

//----------------------------------------------Блок констнт и объявления перменных-------------------------------------

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

// function showScene(sceneId) {
//     // 1. Затемнить экран
//     overlay.classList.add('fade-in');
//     container.classList.add('fade-locked');
    
//     setTimeout(() => {
//         // 2. Скрыть контент, сменить сцену
//         document.querySelectorAll('.scene, #sceneMenu').forEach(el => el.classList.add('hidden'));
//         document.getElementById(`scene${sceneId}`).classList.remove('hidden');
        
//         // 3. Сменить фон
//         document.body.style.backgroundImage = `url('${scenes[sceneId].bg}')`;
        
//         // 4. Осветлить и разблокировать
//         overlay.classList.remove('fade-in');
//         overlay.classList.add('fade-out');
//         container.classList.remove('fade-locked');
//     }, 400); // 400ms затемнения
// }


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
        
        // Оттeмнение
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        container.classList.remove('fade-locked');
        
        // Ждём окончания оттeмнения → разблокировка
        overlay.addEventListener('transitionend', function once2() {
            document.body.style.pointerEvents = 'auto';
            overlay.removeEventListener('transitionend', once2);
        }, { once: true });
        
        overlay.removeEventListener('transitionend', once);
    }, { once: true });
}

// function showMenu() {

//     overlay.classList.add('fade-in');
//     container.classList.add('fade-locked');
//     // Скрыть сцены, показать меню
//     document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
//     document.getElementById('sceneMenu').classList.remove('hidden');

//     setTimeout(() => {
//         document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
//         document.getElementById('sceneMenu').classList.remove('hidden');
//         // Вернуть фон меню (опционально)
//         document.body.style.backgroundImage = `url('${scenes[background_id].bg}')`; // дефолтный фон        
//         overlay.classList.remove('fade-in');
//         overlay.classList.add('fade-out');
//         container.classList.remove('fade-locked');
//     }, 400);
// }

function showMenu() {
    document.body.style.pointerEvents = 'none';
    
    overlay.classList.add('fade-in');
    container.classList.add('fade-locked');
    
    overlay.addEventListener('transitionend', function once() {
        document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
        document.getElementById('sceneMenu').classList.remove('hidden');
        document.body.style.backgroundImage = `url('${scenes[background_id].bg}')`;
        
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


