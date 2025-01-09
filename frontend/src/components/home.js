import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Home =()=>{
    const [info, setInfo]=useState({});
    const [errors, setErrors]= useState({});
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setInfo({
            ...info,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(info);
        try{
            const response = await axios.post('http://localhost:3000/api/users/login',info);
            if(response){
                const id = response.data.id;
                const idC = response.data.company
                if(response.data.Job == "Admin"){
                    navigate(`/admin`);o
                }
                if(response.data.Job == "Manager"){
                    navigate(`/manager/${id}/${idC}`);
                }
                if(response.data.Job == "none"){
                    navigate(`/client/${id}`);
                }
            }else{
                console.log('bad request');
            }
        }catch(error){
            console.log(error);
            if(error.response && error.response.data && error.response.data.message){
                setErrors({ server:error.response.data.message});
            }else{
                setErrors({server : "an error occured, please try again"});
            }
        }
    };
    return(
        <div className='bctn1'>
            <h1 className='Title'>Sign In</h1> <br/><br/>
            <div className="cnt1">
                <div>
                <div className=''>
                    <label className='i1'>Email</label><br/><br/>
                    <input
                        className='ii'
                        type='text'
                        name="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div><br/><br/>
                <div className=''>
                    <label className='i1'>Password</label><br/><br/>
                    <input
                    className='ii'
                        type='password'
                        name="password"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <button className='b1' type='submit' onClick={handleSubmit}>Submit</button><br/><br/>
                {errors.server && <p className="">{errors.server}</p>}
                </div>
            </div><br/><br/>
            
            <Link className="l1" to="/SignUp">Sign Up</Link>
        </div>
    );
};
export default Home;