import axios from "axios";
import { useState } from "react";
import {useHistory} from "react-router-dom";
import {Button, Toast} from "react-bootstrap";
import { getToken } from "../utils/authOperations";
import './index.css';

function NewPost(){
    const history=useHistory();
    const [title,setTitle]=useState("");
    const [location,setLocation]=useState("");
    const [body,setBody]=useState("");
    const [fileName,setFileName]=useState("");
    const onChangeFile =e =>{
        setFileName(e.target.files[0]);
    }
    const createPost = async (e) =>{
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append('title',title);
            formData.append('location',location);
            formData.append('body',body);
            formData.append('image',fileName,fileName.name);

            const response = await axios.post("http://localhost:3070/posts/addpost",formData,{headers:{'Authorization': `Bearer ${getToken()}`}});
            if( await response.status === 200){
                console.log("successfully added");
            }

        }catch(e){
            alert(e);
        }
        // window.location.href = "/posts";
        history.push("/posts");
    }

    return(
        <div className="form-div">
            <form className="post-form" onSubmit={(e)=>createPost(e)} encType='multipart/form-data'>
                <input value={title} type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
                <input value={location} type="text" placeholder="Location" onChange={e=>setLocation(e.target.value)} /><br />
                <input value={body} type="text" placeholder="Body" onChange={e=>setBody(e.target.value)} /><br />
                <input filename="image" type="file" className="button" onChange={(e)=>onChangeFile(e)} /><br />
                <Button type="submit" className="btn">Submit</Button>
            </form>
        </div>

    );
}

export default NewPost;
