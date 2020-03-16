import './styles.css'
import { isValid } from './utils'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit') 
form.addEventListener('submit', submitFormHandler)// добавлен слушатель событий для кнопки

function submitFormHandler(event){
    event.preventDefault()

    if(isValid(input.value)){
        const question = {
            text: input.value.trim(),// удаляет лишние пробелы
            date: new Date().toJSON()
        }

        submitBtn.disabled = true;
        // Ассинхронный запрос на сервер чтобы сохранить вопрос
        console.log('Question', question)
        input.value = ''

    }
}