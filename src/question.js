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

    static fetch(token){
        if(!token){
            return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        return fetch(`https://question-answer-web.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error){
                    return `<p class="error">${response.error}</p>`
                }

                return response ? Object.keys(response).map(key => ({
                    ...response[key], // находит все поля 
                    id: key
                })) : []
            })
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

    static listToHTML(questions){
        return questions.length
        ? `${questions.map(q => `<p>${q.text}<p>`).join('')}`
        : `<p>Вопросов пока нет</p>`
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