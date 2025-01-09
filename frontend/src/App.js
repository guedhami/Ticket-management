import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/home';
import SignUp from './components/signUp';
import Client from './components/client';
import Manager from './components/manager';
import Admin from './components/admin';
import Ticket_client from './components/ViewticketClient';
import ViewTheTicketClient from './components/viewTheTicketClient';
import UpdateAccountGeneral from './components/updateAccountGeneral';
import UpdateTicket from './components/updateTicketClient';
import ViewTheTicketManager from './components/viewTheTicketManager';
import AdminUsers from './components/viewUsersAdmin';
import AddCompany from './components/addCompanyAdmin';
import UpdateCompanyAdmin from './components/updateCompanyAdmin';
import Managers from './components/CompanyManagers';
import UpdateManager from './components/updateManager';
import AddManager from './components/addManagerAdmin';
import ViewTicketAdmin from './components/viewTicketsAdmin';
import UpdateTicketAdmin from './components/updateTicketAdmin';
import ViewTheTicketAdmin from './components/ViewTheTicketAdmin';
import UpdateCommentAdmin from './components/updateCommentAdmin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/client/:id" element={<Client/>}/>
          <Route path="/manager/:id/:idC" element={<Manager/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path='/ticketsClient/:idU/:idC' element={<Ticket_client/>}/>
          <Route path='/viewTheTicketClient/:id' element={<ViewTheTicketClient/>}/>
          <Route path='/updateAccountGeneral/:id' element={<UpdateAccountGeneral/>}/>
          <Route path="/updateTicketClient/:id" element={<UpdateTicket/>}/>
          <Route path="/viewTheTicketManager/:id" element={<ViewTheTicketManager/>}/>
          <Route path="/admin/users"element={<AdminUsers/>}/>
          <Route path="/admin/addCompany"element={<AddCompany/>}/>
          <Route path="/admin/updateCompany/:id"element={<UpdateCompanyAdmin/>}/>
          <Route path="/admin/managers/:id"element={<Managers/>}/>
          <Route path="/admin/updateManager/:id/:idC"element={<UpdateManager/>}/>
          <Route path="/admin/addManager/:id"element={<AddManager/>}/>
          <Route path="/admin/viewTickets/:id"element={<ViewTicketAdmin/>}/>
          <Route path="/admin/updateTicketAdmin/:id"element={<UpdateTicketAdmin/>}/>
          <Route path="/admin/viewTheTicketAdmin/:id"element={<ViewTheTicketAdmin/>}/>
          <Route path="/admin/updateComment/:id/:idT"element={<UpdateCommentAdmin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
