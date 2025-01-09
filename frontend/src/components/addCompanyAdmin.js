import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddCompany =()=>{
    const navigate = useNavigate();
    const [newCompany, setNewCompany] = useState({});
    const handleChange = (e)=>{
        setNewCompany({
            ...newCompany,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:3000/api/companies', newCompany);
            navigate('/admin');
        }catch(error){
            console.error("Error creating Company:",error);
        }
    };
    return(
        <div className=''>
            <h1 className='Title'>Add Company</h1> 
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
                    <label className='i1'>Field</label><br/>
                    <input
                    className='ii'
                        type='text'
                        name="field"
                        onChange={handleChange}
                        requiredplaceholder="enter last field"
                    />
                </div><br/>
                <div className=''>
                    <label className='i1'>Location</label><br/>
                    <input
                    className='ii'
                        type='text'
                        name="location"
                        onChange={handleChange}
                        requiredplaceholder="enter location"
                    />
                </div><br/>
                <button className='b1' onClick={handleSubmit}>Submit</button><br/><br/>
                </div>
            </div><br/>
        </div>
    );
};
export default AddCompany;