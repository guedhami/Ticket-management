import React ,{useState, useEffect,inputRef} from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom';
const Client =() => {
    const navigate = useNavigate();
    const {id} = useParams('id');
    const [companies , setCompanies]=useState([])
    useEffect(()=>{
        const fetchData = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/companies')
            if(response){
                const responseData = response.data;
                responseData.shift();
                setCompanies(responseData);
            }
        }catch(error){
            console.error('something went wrong',error);
        }
    };
    fetchData();
},[])
const view_tickets = (id1,id2)=>{
    console.log(id1);
    navigate(`/ticketsClient/${id1}/${id2}`);
}
const updateAccount = (id)=>{
    navigate(`/updateAccountGeneral/${id}`);
}
const logout = ()=>{
    navigate('/');
}
    return (
        <div  ref={inputRef}>
        <div className="cntT">
            <div className='uptT'>
            <button className='b1' onClick={()=>updateAccount(id)}>Update Account</button>
            </div>
            <h1 className='TitleB'>companies List </h1>
            <div className='logoutT'>
            <button className='b1'onClick={()=>logout()}>Log Out</button>
            </div>
        </div>
        <div className='mainCnt'>
            {companies.map((company)=>(
                    <div key={company.id} className='element'>
                        <div>
                            <h3 className='miniTitle'>Name : {company.name}</h3>
                            <p className='subElem'>Field : {company.field}</p>
                            <p className='subElem'>Location : {company.location}</p>
                            <button 
                            onClick={()=> view_tickets(id,company.id)}
                            className='b1'
                            >View Tickets</button>
                        </div>
                    </div>
                ))}
        </div>
    </div>    
)
};
export default Client;