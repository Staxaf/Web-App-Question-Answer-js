import './styles.css'
import { isValid } from './utils'
import {Question} from './question'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit') 


window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)// добавлен слушатель событий для кнопки
input.addEventListener('input', ()=>{
    submitBtn.disabled = !isValid(input.value)
})


function submitFormHandler(event){
    event.preventDefault()

    if(isValid(input.value)){
        const question = {
            text: input.value.trim(),// удаляет лишние пробелы
            date: new Date().toJSON()
        }

        submitBtn.disabled = true;
        // Ассинхронный запрос на сервер чтобы сохранить вопрос
        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
        })
        //console.log('Question', question)
    }
}