import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp =()=>{
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({});
    const handleChange = (e)=>{
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
            ["company"]:"65ff2c9bb3ecf85aac986305",
            ["Job"]:"none"
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            console.log(newUser);
            await axios.post('http://localhost:3000/api/users', newUser);
            navigate('/');
        }catch(error){
            console.error("Error creating User:",error);
        }
    };
    return(
        <div className=''>
            <h1 className='Title'>Sign Up</h1> 
            <div className="cnt1">
                <div>
                <div className=''>
                    <label className='i1'>Name</label><br/>
                    <input
                    className='ii'
                        type='text'
                        name="name"
                        onChange={handleChange}
                        requiredplaceholder="enter name"
                    />
                </div><br/>
                <div className=''>
                    <label className='i1'>Last Name</label><br/>
                    <input
                    className='ii'
                        type='text'
                        name="last_name"
                        onChange={handleChange}
                        requiredplaceholder="enter last name"
                    />
                </div><br/>
                <div className=''>
                    <label className='i1'>Email</label><br/>
                    <input
                    className='ii'
                        type='text'
                        name="email"
                        onChange={handleChange}
                        requiredplaceholder="enter email"
                    />
                </div><br/>
                <div className=''>
                    <label className='i1'>Phone Number</label><br/>
                    <input
                    className='ii'
                        type='number'
                        name="phone_number"
                        onChange={handleChange}
                        requiredplaceholder="enter phone number"
                    />
                </div><br/>
                <div className=''>
                    <label className='i1'>Password</label><br/>
                    <input
                    className='ii'
                        type='password'
                        name="password"
                        onChange={handleChange}
                        requiredplaceholder="enter password"
                    />
                </div>
                <br/>
                <button className='b1' onClick={handleSubmit}>Submit</button><br/><br/>
                </div>
            </div><br/>
        </div>
    );
};
export default SignUp;