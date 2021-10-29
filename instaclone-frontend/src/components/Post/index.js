import "./index.css";
import {DropdownButton,Dropdown, Toast} from "react-bootstrap";
import axios from "axios";
import {getToken} from "../utils/authOperations";
import {useHistory,Link} from "react-router-dom";
import { useEffect, useState } from "react";

function Post(props){
  const history=useHistory();
  const [clicked,setClicked]=useState(false);
  const [likes,setLikes]=useState(props.likes);
  
  //new working function
  const likeIncrease=(props)=>{
    setClicked(true);
    setLikes(likes+1);
    // console.log('likes onclick',likes);
  }

  async function putLike(){
    //console.log('async like',props._id);
    await axios.put(`http://localhost:3070/posts/likes/${props._id}`,{likes:likes},{headers:{'Authorization': `Bearer ${getToken()}`}});
  }


  useEffect(()=>{
    putLike();
  },[likes]);

  const deletefun= async(props)=>{
    try{
      const url='http://localhost:3070/posts/'+props
      const response= await axios.delete(url,{headers:{'Authorization': `Bearer ${getToken()}`}});
      if( await response.status === 200){
        alert("Successfully deleted");
      }
      history.push('/posts');
    } catch(e){
      alert(e);
    }
  
    // history.push('/posts');
    //window.location.href('/posts');
  }
    return(
      <div className='row justify-content-md-center pt-5' id={props._id}>
        <div className="card card-width new-width">
          <div className='card-header'>
            <ul className="nav nav-tabs card-header-tabs align-header">
              <li>
                <h2 className='card-header-h2'>{props.title}</h2>
                <p className='location-class'>{props.location}</p>
              </li>
              <li>
                <DropdownButton id="dropdown-basic-button">
                  <Dropdown.Item>
                    <Link to={{
                      pathname:`/posts/edit/${props._id}`,
                      state:{props}
                    }}>
                      Edit</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e)=>deletefun(props._id)}>Delete</Dropdown.Item>
                </DropdownButton>
              </li>
            </ul>
          </div>
          <img src={`http://localhost:3070/public/uploads/${props.image}`} className="card-img-top" alt="10x academy"/>
          <div className="card-body p-0">
            <div className='new-row'>
              <div ><i className={clicked? 'fas fa-heart red': 'far fa-heart'} onClick={(e)=>likeIncrease(props)}></i></div>
              {/* <i className="fab fa-telegram-plane icon-margin"></i> */}
              <div >{props.date}</div>
            </div>
            {/* for like increase */}
            {/* <p>{`${props.likes} likes`}</p> */}
            <p>{`${likes} likes`}</p>
            <h5 className="card-text mb-3">{props.body}</h5>
          </div>
        </div>
      </div>
    )
}

export default Post;
