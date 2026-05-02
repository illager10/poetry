Telegram.WebApp.ready();
Telegram.WebApp.expand(); // Fullscreen

document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Выбор добавлен! (пока заглушка)');
        Telegram.WebApp.MainButton.setText('Продолжить').show().onClick(() => {
            Telegram.WebApp.sendData(JSON.stringify({choice: btn.textContent}));
        });
    });
});