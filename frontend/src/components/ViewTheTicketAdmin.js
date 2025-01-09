import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom';
const ViewTheTicketAdmin =() => {
    const {id} = useParams('id');
    const [ticket , setTicket]=useState([])
    const [user,setUser]=useState([])
    const [comments,setComments]=useState([])
    const navigate=useNavigate();
    const delC = async(id1)=>{
        try{
            await axios.delete(`http://localhost:3000/api/comments/${id1}`);
            window. location. reload();
        }catch(error){
            console.error("Error creating Ticket:",error);
        }
    }
    useEffect(()=>{
        const fetchData = async () =>{
        try {
            const response = await axios.get(`http://localhost:3000/api/tickets/${id}`)
            if(response){
                setTicket(response.data);
                try {
                    console.log(response.data.user)
                    const response1 = await axios.get(`http://localhost:3000/api/users/${response.data.user}`)
                    if(response1){
                        setUser(response1.data);
                    }
                }catch(error){
                    console.error('something went wrong',error);
                }
                try {
                    const response2 = await axios.get(`http://localhost:3000/api/commentsTicket/${id}`)
                    if(response2){
                        setComments(response2.data);
                    }
                }catch(error){
                    console.error('something went wrong',error);
                }
            }
            
        }catch(error){
            console.error('something went wrong',error);
        }
    };
    fetchData();
},[])
    return (
    <div>
        <h1 className='Title'>{user.name} {user.last_name}</h1>
        <h2 className='miniTitle'>{ticket.description}</h2>
        <div className="">
        {comments.map((comment)=>(
                    <div key={comments.id} className=''>
                    <div className='ctnCC'>
                        <p className='cmnt'>{comment.description}</p>
                        <button  className="b1"onClick={()=>navigate(`/admin/updateComment/${comment.id}/${ticket.id}`)}>update</button>
                        <button className='b1' onClick={()=>delC(comment.id)}>delete</button>
                    </div>
                </div>
        ))}
        </div>
        <br/><br/>
    </div>
    );
};
export default ViewTheTicketAdmin;