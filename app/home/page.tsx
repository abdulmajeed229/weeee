"use client"

import React from "react";
import Navbar from "../components/navbar";
import HomeCenter from '../components/homecontent';

function Home(){

    localStorage.getItem('user')

    if(localStorage.getItem('user') == null){

        window.location.href = '/'

    }


    return(

        <div className='min-h-[100vh] w-full'>

            <Navbar/>

            <HomeCenter/>
        

          
             
        </div>
    )


    }

   


export default Home;