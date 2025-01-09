import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
const UpdateCommentAdmin =()=>{
    const {id,idT} = useParams();
    const [newComment, setNewComment] = useState({});
    useEffect(() => {
        getCompany();
      }, []);
    
      const getCompany = async() => {
        await axios.get(`http://localhost:3000/api/comments/${id}`)
          .then((item) => {
            setNewComment(item.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3000/api/comments/${id}`, newComment);
            navigate(`/admin/viewTheTicketAdmin/${idT}`);
        }catch(error){
            console.error("Error Updating company:",error);
        }
    };
    return(
        <div className="">
            <h1 className="Title">Update Comment</h1>
            <div className="">
                <div className="">
                    <label className='i1'>Comment</label><br/><br/>
                    <input className='ii'
                        type="text"
                        name="description"
                        onChange={handleChange}
                        requiredplaceholder="enter location"
                        value={newComment.description}
                    />
                </div><br/><br/>
                <button className="b1" type="submit" onClick={handleSubmit}>
                    Update Company
                </button>
            </div>
        </div>    
    );
};
export default UpdateCommentAdmin;