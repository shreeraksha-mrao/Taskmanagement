import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Tasks from './pages/tasks'
import Editors from './pages/editors'
import EditorDetails from './pages/editorDetails'
import AddEditor from './pages/addEditor' 
import Updateeditor from './pages/updateEditor'
import Detailtask from './pages/detailtask'
import AddTask from './pages/addTask'
import Updatetask from './pages/updatetask'
import Updatetaskfinal from './pages/updatetaskfinal'
import Mapping from './pages/map'
import Login from './pages/login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/tasks' element={<Tasks />}/>
          <Route path='/editors' element={<Editors />}/>
          <Route path='/editors/:id' element={<EditorDetails />} />
          <Route path = '/addEditor' element={<AddEditor />} />
          <Route path='/editors/update/:id' element={<Updateeditor/>}/>
          <Route path='/tasks/:id' element={<Detailtask/>}/>
          <Route path = '/addTask' element={<AddTask />} />
          <Route path = '/updatetask/:id' element = {<Updatetask />} />
          <Route path='/updatetaskfinal/:id' element={<Updatetaskfinal/>}/>
          <Route path='/map' element = {< Mapping />} />
          <Route path='/login' element = {<Login />}/>
         </Routes>
      </Router>

    </>
  )
}

export default App
