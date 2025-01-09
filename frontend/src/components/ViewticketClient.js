import React ,{useState, useEffect,inputRef} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
const Ticket_client =() => {
    const navigate = useNavigate();
    const {idU,idC} = useParams();    
    const [tickets , setTickets]=useState([])
    const [tickett,setNewTickett]=useState([])
    const handleChange = (e)=>{
        setNewTickett({
            ...tickett,
            [e.target.name]: e.target.value,
            ["company"]:idC,
            ["user"]:idU,
            ["date"]:Date().toString()
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            console.log(tickett);
            await axios.post('http://localhost:3000/api/tickets', tickett);
            window. location. reload();
        }catch(error){
            console.error("Error creating Ticket:",error);
        }
    };
    
    useEffect(()=>{
        const fetchData = async () =>{
        try {
            console.log(idU,idC)
            const response = await axios.get(`http://localhost:3000/api/ticketsClient/${idU}/${idC}`)
            if(response){
                setTickets(response.data)
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
        console.error("Error deleting Ticket:",error);
    }
}
const updateTicket = (id)=>{
    navigate(`/updateTicketClient/${id}`)
}

    return(
        <div  ref={inputRef}>
        <div className="">
            <h1 className='Title'>Tickets List</h1>
        </div>
        <div className=''>
            {tickets.map((ticket)=>(
                    <div key={ticket.id} className=''>
                        <div>
                            <h3 className='miniTitle'>Description : </h3>
                            <p className='subElem'>{ticket.description}</p>
                            <button 
                            className='b1'
                            onClick={()=>navigate(`/viewTheTicketClient/${ticket.id}`)}
                            >View Ticket</button>
                            <button
                            className='b1'
                            onClick={()=>updateTicket(ticket.id)}
                            >Update Ticket</button>
                            <button
                            className='b1'
                            onClick={()=>delTicket(ticket.id)}
                            >Delete Ticket</button>
                        </div>
                    </div>
                ))}
        </div>
        <div className=''>
            <h1 className='Title'>Add Ticket</h1> 
            <div className="">
                <div>
                <div className=''>
                    <label className='subElem'>Description</label><br/><br/>
                    <textarea
                    className='textArea'
                    type='text'
                    name="description"
                    onChange={handleChange}
                    requiredplaceholder="enter description"
                    ></textarea>
                </div><br/>
                <button className='b1' onClick={handleSubmit}>Submit</button><br/><br/>
                </div>
            </div><br/>
        </div>
    </div>
    );
};
export default Ticket_client;

