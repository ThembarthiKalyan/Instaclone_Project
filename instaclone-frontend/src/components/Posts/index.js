import {get} from "../utils/request";
import { useEffect, useState } from "react";
import Header from "../Header";
import Post from "../Post";
import "./index.css";

function Posts(){
    const [posts, setPosts] = useState([]);

    async function getData(){
        try{
            const response = await get("/posts");
            setPosts(response.data.posts);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div>
            <Header />
            <div className="posts">
                {posts.map(post =>
                    <Post key={post._id} {...post} />
                )}
            </div>
        </div>
    )
}


export default Posts;