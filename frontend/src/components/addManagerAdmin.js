import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
const AddManager =()=>{
    const navigate = useNavigate();
    const {id}=useParams("id");
    const [newUser, setNewUser] = useState({});
    const [company,setCompany]=useState({});
    const handleChange = (e)=>{
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
            ["company"]:id
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            console.log(newUser);
            await axios.post('http://localhost:3000/api/users', newUser);
            navigate(`/admin/managers/${id}`);
        }catch(error){
            console.error("Error creating User:",error);
        }
    };
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/api/companies/${id}`)
                if(response){
                    setCompany(response.data);
                }
            }catch(error){
                console.error('something went wrong',error);
            }
    };
    fetchData();
},[])
    return(
        <div className=''>
            <h1 className='Title'>Add manager to the company :    {company.name}</h1> 
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
                <div className=''>
                    <label className='i1'>Job</label><br/>
                    <input
                    className='ii'
                        type='text'
                        name="Job"
                        onChange={handleChange}
                        requiredplaceholder="enter Job (Admin or Manager)"
                    />
                </div><br/>
                <button className='b1' onClick={handleSubmit}>Submit</button><br/><br/>
                </div>
            </div><br/>
        </div>
    );
};
export default AddManager;