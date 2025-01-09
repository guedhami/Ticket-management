import React, { useState, useEffect, useRef } from 'react'; // Changed inputRef to useRef
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Manager = () => {
    const navigate = useNavigate();
    const { id, idC } = useParams();    
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticketsManager/${idC}`);
                if (response && response.data) {
                    setTickets(response.data);
                }
            } catch (error) {
                console.error('Something went wrong', error);
            }
        };
        fetchData();
    }, [idC]); // Added idC as a dependency

    const delTicket = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`);
            // Update the state to remove the deleted ticket
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } catch (error) {
            console.error("Error deleting Ticket:", error);
        }
    };

    const logout = () => {
        navigate('/');
    };

    const updateAccount = () => {
        navigate(`/updateAccountGeneral/${id}`);
    };

    return (
        <div>
            <div className="cntT">
                <div className='uptT'>
                    <button className='b1' onClick={updateAccount}>Update Account</button>
                </div>
                <h1 className='TitleB'>Tickets List</h1>
                <div className='logoutT'>
                    <button className='b1' onClick={logout}>Log Out</button>
                </div>
            </div>
            <div className='mainCnt'>
                {tickets.map((ticket) => (
                    <div key={ticket.id} className='element'>
                        <div>
                            <h3 className='miniTitle'>Description:</h3>
                            <p className='subElem'>{ticket.description}</p>
                            <button 
                                className='b1'
                                onClick={() => navigate(`/viewTheTicketManager/${ticket.id}`)}
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

export default Manager;