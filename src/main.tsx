import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Admin } from './pages/admin'
import { Monitor1 } from './pages/monitor1'
import { Monitor2 } from './pages/monitor2'
import { Monitor3 } from './pages/monitor3'
import { Player } from './pages/player'

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path='/' element={<Player/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/monitor1' element={<Monitor1/>}/>
            <Route path='/monitor2' element={<Monitor2/>}/>
            <Route path='/monitor3' element={<Monitor3/>}/>
        </Routes>
    </HashRouter>
)
