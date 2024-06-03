import { useState, useEffect } from "react";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore"; //getDocs -- get all 

import React from 'react'

function app() {
    const [userList, createUser] = useState([]);

    //Make reference to the users collection 
    const userCollectionRef = collection(db, "users") //sepecify which collection using the "key" --> which is the name of the collection


    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const data = await getDocs(userCollectionRef)
                console.log(data);
            }
            catch (err) {
                console.error(err);

            }
        }; 
        getAllUsers();
    }, []);


    return (
        <div>app</div>
    )
}
