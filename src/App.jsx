import { BrowserRouter as Router , Link , Routes , Route, BrowserRouter } from 'react-router-dom'

import login from './pages/login'
import email from './pages/email'
import userInfo from './pages/userInfo'
import success from './pages/success'

function App() {

  return (
    <Routes>
      <Route path='/' element={email()}/>
      <Route path='inputInfo' element={userInfo()} />
      <Route path='success' element={success()} />
      <Route path='login' element={login()} />
    </Routes>
  )
}

export default App