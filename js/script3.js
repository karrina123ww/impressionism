        document.addEventListener('DOMContentLoaded', function() {
            const submitBtn = document.getElementById('submitTest');
            const retryBtn = document.getElementById('retryTest');
            const resultsContainer = document.getElementById('resultsContainer');
            const scoreDisplay = document.getElementById('scoreDisplay');
            const scoreText = document.getElementById('scoreText');
            const resultMessage = document.getElementById('resultMessage');
            const optionLabels = document.querySelectorAll('.option-label');
            const questionBlocks = document.querySelectorAll('.question-block');
            
            // Выделение выбранных ответов
            optionLabels.forEach(label => {
                const radio = label.querySelector('.option-radio');
                
                radio.addEventListener('change', function() {
                    // Убираем выделение со всех вариантов в этом вопросе
                    const questionBlock = this.closest('.question-block');
                    questionBlock.querySelectorAll('.option-label').forEach(l => {
                        l.classList.remove('selected');
                    });
                    
                    // Выделяем выбранный вариант
                    if (this.checked) {
                        label.classList.add('selected');
                    }
                });
                
                // Клик на весь label
                label.addEventListener('click', function(e) {
                    if (!radio.checked) {
                        radio.checked = true;
                        radio.dispatchEvent(new Event('change'));
                    }
                });
            });
            
            // Проверка теста
            submitBtn.addEventListener('click', function() {
                let unanswered = [];
                
                // Проверяем все вопросы
                for (let i = 1; i <= 15; i++) {
                    const radios = document.querySelectorAll(`input[name="question${i}"]`);
                    let answered = false;
                    
                    radios.forEach(radio => {
                        if (radio.checked) answered = true;
                    });
                    
                    if (!answered) {
                        unanswered.push(i);
                    }
                }
                
                // Если есть неотвеченные вопросы
                if (unanswered.length > 0) {
                    alert('Пожалуйста, ответьте на все вопросы!\nНе отвечены вопросы: ' + unanswered.join(', '));
                    return; // Прерываем выполнение
                }
                
                let score = 0;
                const totalQuestions = 15;
                
                // Проверяем каждый вопрос
                questionBlocks.forEach((block, index) => {
                    const correctAnswer = block.getAttribute('data-correct');
                    const questionNumber = index + 1;
                    const selectedRadio = block.querySelector(`input[name="question${questionNumber}"]:checked`);
                    
                    // Сбрасываем стили
                    block.querySelectorAll('.option-label').forEach(label => {
                        label.classList.remove('correct', 'incorrect');
                    });
                    
                    if (selectedRadio) {
                        const selectedValue = selectedRadio.value;
                        
                        // Находим выбранный и правильный варианты
                        const selectedLabel = selectedRadio.closest('.option-label');
                        const correctLabel = block.querySelector(`input[value="${correctAnswer}"]`).closest('.option-label');
                        
                        if (selectedValue === correctAnswer) {
                            score++;
                            selectedLabel.classList.add('correct');
                        } else {
                            selectedLabel.classList.add('incorrect');
                            correctLabel.classList.add('correct');
                        }
                    } else {
                        // Если ответ не выбран, показываем правильный
                        const correctLabel = block.querySelector(`input[value="${correctAnswer}"]`).closest('.option-label');
                        correctLabel.classList.add('correct');
                    }
                });
                
                // Показываем результаты
                showResults(score, totalQuestions);
            });
            
            // Показать результаты
            function showResults(score, total) {
                const percentage = (score / total) * 100;
                
                // Обновляем отображение
                scoreDisplay.textContent = `${score}/${total}`;
                scoreText.textContent = `Вы ответили правильно на ${score} из ${total} вопросов`;
                
                // Сообщение в зависимости от результата
                let message = '';
                if (percentage === 100) {
                    message = 'Поздравляем! Вы отлично разбираетесь в импрессионизме! Вы успешно усвоили весь материал и можете считать себя настоящим экспертом в этом направлении искусства.';
                } else if (percentage >= 80) {
                    message = 'Отличный результат! Вы хорошо разбираетесь в импрессионизме. Есть небольшие пробелы, но в целом ваши знания на высоком уровне.';
                } else if (percentage >= 60) {
                    message = 'Хороший результат! Вы знаете основные факты об импрессионизме, но есть над чем поработать. Рекомендуем еще раз изучить материалы сайта.';
                } else if (percentage >= 40) {
                    message = 'Неплохо! Вы знакомы с основами импрессионизма, но некоторые важные детали упускаете. Попробуйте пройти тест еще раз после изучения материалов.';
                } else {
                    message = 'Есть над чем поработать! Импрессионизм - увлекательное направление искусства. Рекомендуем внимательно изучить все разделы сайта и попробовать пройти тест еще раз.';
                }
                
                resultMessage.textContent = message;
                
                // Показываем контейнер с результатами и прокручиваем к нему
                resultsContainer.style.display = 'block';
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Кнопка "Пройти заново"
            retryBtn.addEventListener('click', function() {
                // Сбрасываем форму
                document.getElementById('testForm').reset();
                
                // Сбрасываем все стили
                questionBlocks.forEach(block => {
                    block.querySelectorAll('.option-label').forEach(label => {
                        label.classList.remove('selected', 'correct', 'incorrect');
                    });
                });
                
                // Скрываем результаты
                resultsContainer.style.display = 'none';
                
                // Прокручиваем к началу теста
                document.querySelector('.test-section').scrollIntoView({ behavior: 'smooth' });
            });
        });