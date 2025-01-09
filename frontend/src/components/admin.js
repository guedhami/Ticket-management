import React,{useState,useEffect,inputRef} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Admin =() => {
    const navigate = useNavigate();
    const [companies,setCompanies]=useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/api/companies/`)
                if(response){
                    setCompanies(response.data);
                }
            }catch(error){
                console.error('something went wrong',error);
            }
    };
    fetchData();
},[])
    const logout = ()=>{
        navigate('/');
    }
    const viewUsers = ()=>{
        navigate('/admin/users');
    }
    const delCompany = async(id)=>{
        try {
            await axios.delete(`http://localhost:3000/api/companies/${id}`);
            window. location. reload();
        } catch (error) {
            console.error("Error deleting Company:",error);
        }
    }
    const addCompany = ()=>{
        navigate('/admin/addCompany');
    }
    const updateCompany = (id)=>{
        navigate(`/admin/updateCompany/${id}`);
    }
    const Managers = (id)=>{
        navigate(`/admin/managers/${id}`);
    }
    const viewTickets = (id)=>{
        navigate(`/admin/viewTickets/${id}`);
    }
    return (
    <div  ref={inputRef}>
        <div className="cntT">
            <div className='uptT'>
            <button className='b1' onClick={()=>viewUsers()}>Users</button>
            </div>
            <h1 className='TitleB'>Admin </h1>
            <div className='logoutT'>
            <button className='b1'onClick={()=>logout()}>Log Out</button>
            </div>
        </div>
        <div>
            <h2 className='miniTitle'>Companies List  </h2>
            <button className='b1' onClick={()=>addCompany()}>Add Company</button>
        </div>
        <div className='mainCnt'>
            {companies.map((company)=>(
                    <div key={company.id} className=''>
                        <div className='element'>
                            <h3 className='miniTitle'>Name : {company.name}</h3>
                            <p className='subElem'>Field : {company.field}</p>
                            <p className='subElem'>Location : {company.location}</p>
                            <button
                            className='b1'
                            onClick={()=>viewTickets(company.id)}
                            >Tickets</button>
                            <button 
                            className="b1"
                            onClick={()=> Managers(company.id)}
                            >Managers</button>
                            <button 
                            onClick={()=> updateCompany(company.id)}
                            className='b1'
                            >Update</button>
                            <button 
                            onClick={()=> delCompany(company.id)}
                            className='b1'
                            >Delete</button>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    );
};
export default Admin;