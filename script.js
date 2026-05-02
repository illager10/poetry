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
      }, 400); // 400ms затемнения
}


function showMenu() {

    overlay.classList.add('fade-in');    
    
    setTimeout(() => {
        // Скрыть сцены, показать меню
        document.querySelectorAll('.scene, #sceneMenu').forEach(el => el.classList.add('hidden'));
        document.getElementById('sceneMenu').classList.remove('hidden');
        // Вернуть фон меню (опционально)
        document.body.style.backgroundImage = `url('${scenes[background_id].bg}')`; // основной фон   

        overlay.classList.remove('fade-in');
    }, 400);
}

