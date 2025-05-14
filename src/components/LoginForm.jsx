import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, setErrorMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            ) 
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                <label htmlFor="password">password</label>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
  