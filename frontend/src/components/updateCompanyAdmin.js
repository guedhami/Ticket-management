import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
const UpdateCompanyAdmin =()=>{
    const {id} = useParams('id');
    const [newCompany, setNewCompany] = useState({});
    useEffect(() => {
        getCompany();
      }, []);
    
      const getCompany = async() => {
        await axios.get(`http://localhost:3000/api/companies/${id}`)
          .then((item) => {
            setNewCompany(item.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setNewCompany({
            ...newCompany,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3000/api/companies/${id}`, newCompany);
            navigate(`/admin`);
        }catch(error){
            console.error("Error Updating company:",error);
        }
    };
    return(
        <div className="">
            <h1 className="Title">Update Company</h1>
            <div className="cnt1">
                <div className="">
                    <label className='i1'>Name</label><br/><br/>
                    <input
                    className='ii'
                        type="text"
                        name="name"
                        onChange={handleChange}
                        requiredplaceholder="enter name"
                        value={newCompany.name}
                    /><br/><br/>
                </div>
                <div className="">
                    <label className='i1'>Field</label><br/><br/>
                    <input
                    className='ii'
                        type="text"
                        name="field"
                        onChange={handleChange}
                        requiredplaceholder="enter field"
                        value={newCompany.field}
                    /><br/><br/>
                </div>
                <div className="">
                    <label className='i1'>Location</label><br/><br/>
                    <input
                    className='ii'
                        type="text"
                        name="location"
                        onChange={handleChange}
                        requiredplaceholder="enter location"
                        value={newCompany.location}
                    /><br/>
                </div><br/><br/>
                <button className="b1" type="submit" onClick={handleSubmit}>
                    Update Company
                </button><br/><br/>
            </div>
        </div>    
    );
};
export default UpdateCompanyAdmin;