Telegram.WebApp.ready();
Telegram.WebApp.expand();

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
    // Скрыть всё
    document.querySelectorAll('.scene, #sceneMenu').forEach(el => el.classList.add('hidden'));
    
    // Показать сцену
    document.getElementById(`scene${sceneId}`).classList.remove('hidden');
    
    // Сменить фон
    document.body.style.backgroundImage = `url('${scenes[sceneId].bg}')`;
}

function showMenu() {
    // Скрыть сцены, показать меню
    document.querySelectorAll('.scene').forEach(el => el.classList.add('hidden'));
    document.getElementById('sceneMenu').classList.remove('hidden');
    
    // Вернуть фон меню (опционально)
    document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/illager10/poetry/refs/heads/main/images/background.jpg')"; // или любой дефолтный
}