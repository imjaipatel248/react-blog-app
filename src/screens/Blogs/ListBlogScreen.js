import { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";

export default function ListBlogScreen  ({blogs}) {
    const [listBlogs,setListBlogs]=useState([]);
    useEffect(() => {
        setListBlogs(blogs)      
    },[blogs]);
    console.log('blogs');
    return (<div>
        {listBlogs.map((blogDetail)=>
            <CardComponent key={blogDetail.id} blogDetail={blogDetail}></CardComponent> )}
        </div>
    );
}