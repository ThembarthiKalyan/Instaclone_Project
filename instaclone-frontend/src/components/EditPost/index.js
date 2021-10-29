import {useLocation, useHistory} from "react-router-dom";
import { useState } from "react";
import {Button} from "react-bootstrap";
import {getToken} from "../utils/authOperations";
import axios from "axios";

function EditPost(){
    const location=useLocation();
    const history=useHistory();
    const [title,setTitle]=useState(location.state.props.title);
    const [location1,setLocation]=useState(location.state.props.location);
    const [body,setBody]=useState(location.state.props.body);
    const [fileName,setFileName]=useState('');
    const onChangeFile =e =>{
        setFileName(e.target.files[0]);
    }

    const editPost = async (e) =>{
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append('title',title);
            formData.append('location',location1);
            formData.append('body',body);
            // if image is not given in edit form
            if(fileName.name !== undefined){
                formData.append('image',fileName,fileName.name);
            }
            const response = await axios.put(`http://localhost:3070/posts/${location.state.props._id}`,formData,{headers:{'Authorization': `Bearer ${getToken()}`}});
            if( await response.status === 200){
                console.log("successfully edited");
            }

        }catch(e){
            alert(e);
        }
        history.push("/posts");
    }

    return(
        <div>
            <form className="post-form" onSubmit={(e)=>editPost(e)} encType='multipart/form-data'>
                <label htmlFor="title" >Title</label>
                <input value={title} type="text" onChange={e=>setTitle(e.target.value)} /><br />
                <label htmlFor="location1" >Location</label>
                <input value={location1} type="text" onChange={e=>setLocation(e.target.value)} /><br />
                <label htmlFor="body">Body</label>
                <input value={body} type="text"  onChange={e=>setBody(e.target.value)} /><br />
                <label htmlFor="image">ImageUrl</label>
                <input filename="image" type="file" className="button" onChange={(e)=>onChangeFile(e)} /><br />
                <Button type="submit" className="btn">Submit</Button>
            </form>
        </div>

    );
}

export default EditPost;