const API_KEY = 'gWLXg9z9_FtxmywAhIP3G3jg28P6pEFmHuFhm9KQ4RI';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const photoContainer = document.getElementById('photo-container');


// Устанавливаем фокус (курсор) на поле ввода при загрузке страницы
searchInput.focus();

// Функция для отправки запроса к Unsplash API и отображения результатов
async function searchPhotos(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}`);
        const data = await response.json();
        const photos = data.results;

        // Очищаем предыдущие результаты
        photoContainer.innerHTML = '';

        // Отображаем найденные фотографии
        const maxPhotosToShow = 9;
        for (let i = 0; i < Math.min(photos.length, maxPhotosToShow); i++) {
            const photo = photos[i];
            const img = document.createElement('img');
            img.src = photo.urls.small;
            img.alt = photo.alt_description;
            img.classList.add('photo');
            photoContainer.appendChild(img);
        }
    } catch (error) {
        console.error('Ошибка при запросе к API:', error);
    }
}

// Устанавливаем обработчик события клика на иконку-крестик
clearButton.addEventListener('click', () => {
    searchInput.value = ''; // Очищаем поле ввода
    searchInput.placeholder = 'Введите запрос'; // Устанавливаем placeholder
    clearButton.style.display = 'none'; // Скрываем иконку-крестик
});

// Устанавливаем обработчик события для поля ввода при вводе текста
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query) {
        clearButton.style.display = 'block'; // Показываем иконку-крестик, если поле не пустое
    } else {
        clearButton.style.display = 'none'; // Скрываем иконку-крестик, если поле пустое
    }
});

// Обработчик события для кнопки "Поиск"
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchPhotos(query);
    }
});

// Обработчик события для поля ввода при нажатии клавиши Enter
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.activeElement === searchInput) {
        const query = searchInput.value.trim();
        if (query) {
            searchPhotos(query);
        }
    }
});

// Обработчик события при вводе текста
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query) {
        clearButton.style.display = 'block';
    } else {
        clearButton.style.display = 'none';
    }
});

// Загрузка изображений при открытии страницы
window.addEventListener('load', () => {
    searchPhotos('landscape'); // Начальный запрос
});