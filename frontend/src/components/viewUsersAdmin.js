import React,{useState,useEffect,inputRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const AdminUsers =() => {
    const navigate = useNavigate();
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/api/users/`)
                if(response){
                    setUsers(response.data);
                }
            }catch(error){
                console.error('something went wrong',error);
            }
            
    };
    fetchData();
},[])
    const delUser = async(id)=>{
        try {
            await axios.delete(`http://localhost:3000/api/users/${id}`);
            window. location. reload();
        } catch (error) {
            console.error("Error deleting User:",error);
        }
    }
    const updateUser = (id)=>{
        navigate(`/updateAccountGeneral/${id}`);
    }
    return (
    <div  ref={inputRef}>
        <div className="">
        <h1 className='Title'>Users List</h1>
        </div>
        <div className='mainCnt'>
            {users.map((user)=>(
                    <div key={user.id} className='element'>
                        <div>
                            <p className='subElem'>Name : {user.name}</p>
                            <p className='subElem'>Last Name : {user.last_name}</p>
                            <p className='subElem'>email : {user.email}</p>
                            <p className='subElem'>Phone Number : {user.phone_number}</p>
                            <button 
                            onClick={()=> updateUser(user.id)}
                            className='b1'
                            >Update</button>
                            <button 
                            onClick={()=> delUser(user.id)}
                            className='b1'
                            >Delete</button>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    );
};
export default AdminUsers;