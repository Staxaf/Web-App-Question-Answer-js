import './styles.css'
import { createModal, isValid } from './utils'
import {Question} from './question'
import {authWithEmailAndPassword, getAuthForm} from './auth'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit') 
const modalBtn = document.getElementById('modal-btn')

submitBtn.disabled = true
modalBtn.addEventListener('click', openModal)
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


function openModal(){
    createModal('Авторизация', getAuthForm())
    document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHangler, {once: true})// событие добавится единожды
}

function authFormHangler(){
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled=true
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content){
    if(typeof content === 'string'){
        createModal('Ошибка!!', content)
    }
    else{
        createModal('Список вопросов', Question.listToHTML(content))
   }
 }
