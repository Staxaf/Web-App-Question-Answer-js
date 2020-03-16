export class Question {
    static create(question){// запрос на сервер
        return fetch('https://question-answer-web.firebaseio.com/questions.json',{ // в браузреном api нативный метод
            method: 'POST', // для удаления
            body: JSON.stringify(question),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }
    static renderList(){
        const questions = getQuestionsFromLocalStorage();
        // Формировуем html разметку вопросов
        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`
        const list = document.getElementById('list')

        list.innerHTML = html;
    }
}

function addToLocalStorage(question){// добавить вопросы в локальное хранилище
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage(){// получить вопросы с локального хранилища
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question){// формирование вопроса в html
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `
}