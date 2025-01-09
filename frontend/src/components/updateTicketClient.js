import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
const UpdateTicket =()=>{
    const {id} = useParams('id');
    const [newTicket, setNewTicket] = useState({});
    useEffect(() => {
        getTicket();
      }, []);
    
      const getTicket = async() => {
        await axios.get(`http://localhost:3000/api/tickets/${id}`)
          .then((item) => {
            setNewTicket(item.data);
            console.log(item.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setNewTicket({
            ...newTicket,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            console.log(newTicket);
            await axios.put(`http://localhost:3000/api/tickets/${id}`, newTicket);
            navigate(`/ticketsClient/${newTicket.user}/${newTicket.company}`);
        }catch(error){
            console.error("Error Updating Ticket:",error);
        }
    };
    return(
        <div className="">
            <h1 className="Title">Update Ticket</h1>
            <div className="">
            <div className=''>
                    <label className='subElem'>Description</label><br/><br/>
                    <textarea
                    className='textArea'
                    type='text'
                    name="description"
                    onChange={handleChange}
                    requiredplaceholder="enter description"
                    value={newTicket.description}
                    ></textarea>
                </div><br/>
                <button className='b1' onClick={handleSubmit}>Submit</button><br/><br/>
                </div>
        </div>    
    );
};
export default UpdateTicket;