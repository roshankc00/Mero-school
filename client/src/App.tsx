import './App.css'
import {Route,Routes} from 'react-router-dom'
import SignIn from './pages/Signin/index'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/Signup'
import { ToastContainer} from 'react-toastify';
import Sidebar from './components/Sidebar'
import Lectures from './pages/Lectures'
import Sections from './pages/Sections'
import AddLectureForm from './components/forms/AddLectureForm'
import Courses from './pages/Courses'
import AddCourseForm from './components/forms/AddCourseForm'
import EditLectureForm from './components/forms/EditLectureForm'
import SecureRoute from './routes/SecureRoute'
import UmMatchedRoutePage from './pages/unmatchedRoutePage'
// import AccessDenied from './pages/AccesDenied'
import Cart from './pages/Cart'
import PrivateRoute from './routes/privateRoute'
import PaymentSucessPage from './pages/SucessPage'
import InboxMessage from './pages/Inbox'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/> 

      <Route path='/' element={<SecureRoute/>}>

      <Route path='/' element={<Sidebar/>}>        
      <Route path='/' element={<PrivateRoute/>}>

      <Route path='/addlectureform' element={<AddLectureForm/>}/>
      <Route path='/addcourseform' element={<AddCourseForm/>}/>
      <Route path='/lecture/:id' element={<EditLectureForm/>}/>
      <Route path='/lecture' element={<Lectures/>}/>
      <Route path='/section' element={<Sections/>}/>
      </Route>

      <Route path='/course' element={<Courses/>}/>
      <Route path='/inbox' element={<InboxMessage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/success' element={<PaymentSucessPage/>}/>
      </Route>
      </Route>
      <Route path='*' element={<UmMatchedRoutePage/>}/>

    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
