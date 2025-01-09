import React, { useState, useEffect, useRef } from "react"; // Changed inputRef to useRef
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Managers = () => {
    const { id } = useParams(); // No argument needed
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/companies/${id}`);
                if (response) {
                    if (response.data.name !== "users") {
                        try {
                            const response1 = await axios.get(`http://localhost:3000/api/users/managers/${id}`);
                            setUsers(response1.data);
                        } catch (error) {
                            console.error('Something went wrong', error);
                        }
                    } else {
                        try {
                            const response1 = await axios.get(`http://localhost:3000/api/users/admins/${id}`);
                            setUsers(response1.data);
                        } catch (error) {
                            console.error('Something went wrong', error);
                        }
                    }
                }
            } catch (error) {
                console.error('Something went wrong', error);
            }
        };
        fetchData();
    }, [id]); // Added id as a dependency to useEffect

    const delUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            // Remove the deleted user from the state
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting User:", error);
        }
    };

    const updateUser = (userId, companyId) => {
        navigate(`/admin/updateManager/${userId}/${companyId}`);
    };

    const addManager = () => {
        navigate(`/admin/addManager/${id}`);
    };

    return (
        <div ref={useRef()}>
            <div className="cntT">
                <div className="uptT"></div>
                <h1 className="TitleB">Managers List</h1>
                <div className="logoutT">
                    <button className="b1" onClick={addManager}>Add Manager</button>
                </div>
            </div>
            <div className='mainCnt'>
                {users.map((user) => (
                    <div key={user.id} className='element'>
                        <div>
                            <p className="subElem">Name: {user.name}</p>
                            <p className="subElem">Last Name: {user.last_name}</p>
                            <p className="subElem">Email: {user.email}</p>
                            <p className="subElem">Phone Number: {user.phone_number}</p>
                            <button 
                                onClick={() => updateUser(user.id, user.company)}
                                className='b1'
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => delUser(user.id)}
                                className='b1'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Managers;