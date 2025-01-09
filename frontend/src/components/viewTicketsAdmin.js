import React ,{useState, useEffect,inputRef} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
const ViewTicketAdmin =() => {
    const navigate = useNavigate();
    const {id} = useParams('id');    
    const [tickets , setTickets]=useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/api/ticketsManager/${id}`)
                if(response){
                    setTickets(response.data);
                }
            }catch(error){
                console.error('something went wrong',error);
            }
    };
    fetchData();
},[])
const updateTicket = (id)=>{
    navigate(`/admin/updateTicketAdmin/${id}`)
}
const delTicket = async(id)=>{
    try{
        await axios.delete(`http://localhost:3000/api/tickets/${id}`);
        window. location. reload();
    }catch(error){
        console.error("Error creating Ticket:",error);
    }
}
    return(
        <div  ref={inputRef}>
        <div className="">
            <h1 className='Title'>Tickets List</h1>
        </div>
        <div className='ctnCC'>
            {tickets.map((ticket)=>(
                    <div key={ticket.id} className='element'>
                        <div>
                            <h3 className='miniTitle'>Description : </h3>
                            <p className='subElem'>{ticket.description}</p>
                            <button
                            className='b1'
                             onClick={()=>updateTicket(ticket.id)}>Update</button>
                            <button 
                            className='b1'
                            onClick={()=>navigate(`/admin/viewTheTicketAdmin/${ticket.id}`)}
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
export default ViewTicketAdmin;

