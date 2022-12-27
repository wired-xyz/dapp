import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { AuthenticationContext } from '../contexts/authentication';
import { useContext } from 'react';
import { getDefaultProfile,client,getFollowing } from '../api';


const Following=()=>{
    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    const { address, connector } = useAccount();
    const [lenshandle,setlenshandle]=useState();
    const [followinglist,setfollowinglist]=useState();

    useEffect(()=>{
        if(address && authentication){
          getlenshandle();
          getprofilefollowings();
        }
      })
    
      async function getlenshandle() {
        try{
          const response = await client.query({
            query: getDefaultProfile,
            variables: { 
            request:{ 
              ethereumAddress:address
            }  
            }
          })
          console.log("profile handle:",response)
          if(response)
          {
            setlenshandle(response.data.defaultProfile.handle)
          }
        }
        catch(err){
          console.log(err);
        }
      }

      async function getprofilefollowings(){
        try{
            const response = await client.query({
              query: getFollowing,
              variables: { 
              request:{ 
                address:address,
                limit:10
              }  
              }
            })
            console.log("following:",response)
            if(response)
            {
              setfollowinglist(response.data.following.items)
            }
          }
          catch(err){
            console.log(err);
          }
        }

     function Renderprofiles(prof){
       
        console.log(prof)
        prof=prof.prof.profile
        return (<div className='bg-slate-500 rounded-md max-w-xs'>
            <h1>{`id: ${prof.id}`}</h1>
            <h1>{`name: ${prof.name}`}</h1>
            <h1>{`handle:${prof.handle}`}</h1>
            <br></br>
        </div>)
    }
      

    return(
        <div>
            <h1 className="py-2">{`your following - ${lenshandle}`}</h1>
            {
                 
                   followinglist?.map((profile,index)=>
                   <>
                   <Renderprofiles  prof={profile}/>
                   </>
                   ) 
            }
        </div>
    )
}
export default Following; 