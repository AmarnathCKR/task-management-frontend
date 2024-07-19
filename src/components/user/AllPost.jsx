import React, { useEffect, useState } from 'react'
import { getAnyApi } from '../../api/api';
import { useSelector } from 'react-redux';
import Post from './Post';

function AllPost({active}) {
    const [allPosts, setPost]=useState(null);
    const [trigger, setTrigger] = useState(false);
    const token = useSelector((state)=>state.token);
    useEffect(()=>{
        getAnyApi("user/fetch-allpost",token)
        .then((res)=>{
            console.log(res);
            if(res.data.load.length === 0){
                setPost(null);
            }else{
                setPost(res.data.load);
            }
            
        }).catch((err)=>{
            console.log(err);
        })
    },[trigger,active])
  return (
    <>
        {allPosts && <>
            {allPosts.map((item)=>{
                return <Post trigger={()=>setTrigger(!trigger)} key={item._id} content={item}  />
            })}
        </>}
    </>
  )
}

export default AllPost