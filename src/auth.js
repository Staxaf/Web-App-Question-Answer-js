export function getAuthForm(){
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" 
                required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" 
                required>
                <label for="password">Пароль</label>
            </div>
                <button type="submit" id="btnSubmit" 
                class="mui-btn mui-btn--primary">
                    Войти
                </button>
        </form>
    `
}

export function authWithEmailAndPassword(email, password){
    const apiKey = 'AIzaSyD2EW1q7zm0yvV_D9ph-qZBy-e0w2Nb_nU'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
        method: 'POST',
        body: JSON.stringify({
            email,password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resposne => resposne.json())
        .then(data => data.idToken)
}