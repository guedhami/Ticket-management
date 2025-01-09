import React ,{useState, useEffect,inputRef} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
const Manager =() => {
    const navigate = useNavigate();
    const {id,idC} = useParams();    
    const [tickets , setTickets]=useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/api/ticketsManager/${idC}`)
                if(response){
                    setTickets(response.data);
                }
            }catch(error){
                console.error('something went wrong',error);
            }
    };
    fetchData();
},[])
const delTicket = async(id)=>{
    try{
        await axios.delete(`http://localhost:3000/api/tickets/${id}`);
        window. location. reload();
    }catch(error){
        console.error("Error creating Ticket:",error);
    }
}
const logout = ()=>{
    navigate('/');
}
const updateAccount = (id)=>{
    navigate(`/updateAccountGeneral/${id}`);
}
    return(
        <div  ref={inputRef}>
        <div className="cntT">
            <div className='uptT'>
            <button className='b1' onClick={()=>updateAccount(id)}>Update Account</button>
            </div>
            <h1 className='TitleB'>Tickets List </h1>
            <div className='logoutT'>
            <button className='b1'onClick={()=>logout()}>Log Out</button>
            </div>
        </div>
        <div className='mainCnt'>
            {tickets.map((ticket)=>(
                    <div key={ticket.id} className='element'>
                        <div >
                            <h3 className='miniTitle'>Description : </h3>
                            <p className='subElem'>{ticket.description}</p>
                            <button 
                            className='b1'
                            onClick={()=>navigate(`/viewTheTicketManager/${ticket.id}`)}
                            >View Ticket</button>
                            <button
                            className='b1'
                            onClick={()=>delTicket(ticket.id)}
                            >Delete Ticket</button>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    );
};
export default Manager;

