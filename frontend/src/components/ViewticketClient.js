import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Ticket_client = () => {
    const navigate = useNavigate();
    const { idU, idC } = useParams();    
    const [tickets, setTickets] = useState([]);
    const [ticket, setNewTicket] = useState({});

    const handleChange = (e) => {
        setNewTicket({
            ...ticket,
            [e.target.name]: e.target.value,
            company: idC,
            user: idU,
            date: new Date().toISOString(), // Use ISO format for date
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/tickets', ticket);
            setTickets([...tickets, response.data]); // Update state with the new ticket
            setNewTicket({}); // Reset the form
        } catch (error) {
            console.error("Error creating Ticket:", error);
            alert("Failed to create ticket. Please try again."); // User feedback
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticketsClient/${idU}/${idC}`);
                if (response) {
                    setTickets(response.data);
                }
            } catch (error) {
                console.error('Something went wrong', error);
            }
        };
        fetchData();
    }, [idU, idC]); // Dependencies added for useEffect

    const delTicket = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tickets/${id}`);
            setTickets(tickets.filter(ticket => ticket.id !== id)); // Update state
        } catch (error) {
            console.error("Error deleting Ticket:", error);
            alert("Failed to delete ticket. Please try again."); // User feedback
        }
    };

    const updateTicket = (id) => {
        navigate(`/updateTicketClient/${id}`);
    };

    return (
        <div>
            <div>
                <h1 className='Title'>Tickets List</h1>
            </div>
            <div>
                {tickets.map((ticket) => (
                    <div key={ticket.id}>
                        <h3 className='miniTitle'>Description:</h3>
                        <p className='subElem'>{ticket.description}</p>
                        <button 
                            className='b1'
                            onClick={() => navigate(`/viewTheTicketClient/${ticket.id}`)}
                        >
                            View Ticket
                        </button>
                        <button
                            className='b1'
                            onClick={() => updateTicket(ticket.id)}
                        >
                            Update Ticket
                        </button>
                        <button
                            className='b1'
                            onClick={() => delTicket(ticket.id)}
                        >
                            Delete Ticket
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h1 className='Title'>Add Ticket</h1> 
                <div>
                    <label className='subElem'>Description</label>
                    <br /><br />
                    <textarea
                        className='textArea'
                        name="description"
                        onChange={handleChange}
                        required
                        placeholder="Enter description"
                    />
                    <br />
                    <button className='b1' onClick={handleSubmit}>Submit</button>
                    <br /><br />
                </div>
            </div>
        </div>
    );
};

export default Ticket_client;