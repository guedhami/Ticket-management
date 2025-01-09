import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
const UpdateAccountGeneral =()=>{
    const {id} = useParams('id');
    const [newUser, setNewUser] = useState({});
    useEffect(() => {
        getUser();
      }, []);
    
      const getUser = async() => {
        await axios.get(`http://localhost:3000/api/users/${id}`)
          .then((item) => {
            setNewUser(item.data);
            console.log(newUser);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3000/api/users/${id}`, newUser);
            navigate(`/client/${id}`);
        }catch(error){
            console.error("Error Updating User:",error);
        }
    };
    return(
        <div className="">
            <h1 className="Title">Update Account</h1>
            <div className="cnt1">
                <br/>
                <div className="">
                    <label className="i1">Name</label><br/><br/>
                    <input
                    className='ii'
                        type="text"
                        name="name"
                        onChange={handleChange}
                        requiredplaceholder="enter name"
                        value={newUser.name}
                    />
                </div><br/>
                <div className="">
                    <label className="i1">Last Name</label><br/><br/>
                    <input
                    className='ii'
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        requiredplaceholder="enter last name"
                        value={newUser.last_name}
                    />
                </div><br/>
                <div className="">
                    <label className="i1">Phone number</label><br/><br/>
                    <input
                    className='ii'
                        type="number"
                        name="phone_number"
                        onChange={handleChange}
                        requiredplaceholder="enter phone number"
                        value={newUser.phone_number}
                    />
                </div><br/>
                <div className="">
                    <label className="i1">Email</label><br/><br/>
                    <input
                    className='ii'
                        type="email"
                        name="email"
                        onChange={handleChange}
                        requiredplaceholder="enter email"
                        value={newUser.email}
                    />
                </div><br/>
                <div className="">
                    <label className='i1'>New Password</label><br/><br/>
                    <input
                        className='ii'
                        type="password"
                        name="password"
                        onChange={handleChange}
                        requiredplaceholder="enter password"
                        
                    />
                </div><br/>
                <button className="b1" type="submit" onClick={handleSubmit}>
                    Update Account
                </button>
                <br/><br/>
            </div>
            
        </div>    
    );
};
export default UpdateAccountGeneral;