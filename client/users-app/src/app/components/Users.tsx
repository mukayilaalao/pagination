"use client";

import { useEffect, useState } from "react";
import {User} from "../interfaces/types";
import UserCard from "./UserCard";
import styles from "./Users.module.css";

export default function Users() {
    const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [users, setUsers] = useState<User[]>([]);
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const getUsers = async() => {
    const response = await fetch(`${api_url}/users?page=${page}&limit=${limit}`);
    const users = await response.json();
    setUsers(users.data);
  }
  useEffect(()=> {
    getUsers();
  }, [page]);

  return (
  <div>
    <h2>My users</h2>
        <h4>Five at a time</h4>
        <button className={styles.button} onClick={()=> setPage(page-1)} disabled={page==1}>Prev</button>
        <ul className={styles.ba}>
          {users?.map(user=> (<UserCard key={user.id} user={user}/>))}
        </ul>
        <button className={styles.button} onClick={()=> setPage(page+1)} disabled={users&&users.length < limit}>Next</button>
  </div>)

}