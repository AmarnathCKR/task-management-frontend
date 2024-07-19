import React, { useEffect, useState } from "react";
import PageWrapper from "../../layouts/user/PageWrapper";
import { getAnyApi } from "../../api/api";
import { useSelector } from "react-redux";
import Post from "../../components/user/Post";

function MyFeed() {
    const [myPosts, setPost]=useState(null);
    const [trigger, setTrigger] = useState(false);
    const token = useSelector((state)=>state.token);
    useEffect(()=>{
        getAnyApi("user/fetch-mypost",token)
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
    },[trigger])
  return (
    <>
    <PageWrapper>
      <div className="w-full flex flex-col justify-center align-middle items-center">
        <div className="bg-teal-900 bg-transparent flex flex-col items-center min-h-screen align-middle justify-center md:w-5/12">
            {!myPosts ? <p className="text-2xl text-white">No Posts yet</p> :<>
                {myPosts.map((item)=>{
                    return <Post trigger={()=>setTrigger(!trigger)} key={item._id} content={item}  />
                })}
            </>}
        </div>
      </div>
      </PageWrapper>
    </>
  );
}

export default MyFeed;
