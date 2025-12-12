        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slider-slide');
            let currentSlide = 0;
            
            function showSlide(index) {
                // Скрыть все слайды
                slides.forEach(slide => slide.classList.remove('active'));
                // Показать текущий слайд
                slides[index].classList.add('active');
            }
            
            // Автоматическая смена слайдов каждые 5 секунд
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
            
            // Показать первый слайд
            showSlide(currentSlide);
            
            // Запустить автоматическую смену
            setInterval(nextSlide, 3000);
            
            // Для ручного переключения при клике на слайдер
            document.querySelector('.full-width-slider').addEventListener('click', nextSlide);
        });