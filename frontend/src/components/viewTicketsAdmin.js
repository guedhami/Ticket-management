import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewTicketAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();    
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticketsManager/${id}`);
                if (response && response.data) {
                    setTickets(response.data);
                }
            } catch (error) {
                console.error('Something went wrong', error);
            }
        };
        fetchData();
    }, [id]); // Added id as a dependency

    const updateTicket = (ticketId) => {
        navigate(`/admin/updateTicketAdmin/${ticketId}`);
    };

    const delTicket = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`);
            // Update state to remove the deleted ticket
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } catch (error) {
            console.error("Error deleting Ticket:", error);
            alert("Failed to delete ticket. Please try again."); // User feedback
        }
    };

    return (
        <div>
            <div>
                <h1 className='Title'>Tickets List</h1>
            </div>
            <div className='ctnCC'>
                {tickets.map((ticket) => (
                    <div key={ticket.id} className='element'>
                        <div>
                            <h3 className='miniTitle'>Description:</h3>
                            <p className='subElem'>{ticket.description}</p>
                            <button
                                className='b1'
                                onClick={() => updateTicket(ticket.id)}
                            >
                                Update
                            </button>
                            <button 
                                className='b1'
                                onClick={() => navigate(`/admin/viewTheTicketAdmin/${ticket.id}`)}
                            >
                                View Ticket
                            </button>
                            <button
                                className='b1'
                                onClick={() => delTicket(ticket.id)}
                            >
                                Delete Ticket
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewTicketAdmin;