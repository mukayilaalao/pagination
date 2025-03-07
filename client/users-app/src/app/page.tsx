"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [users, setUsers] = useState<User[]>();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const getUsers = async() => {
    const response = await fetch(`${api_url}/users?page=${page}&limit=${limit}`);
    const users = await response.json();
    setUsers(users);
  }
  useEffect(()=> {
    getUsers();
  }, [page]);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>My users</h2>
        <h4>Five at a time</h4>
        <button onClick={()=> page-1} disabled={page==1}>Prev</button>
        <section>
          {users?.map(user=> (<div key={user.id}>user.name</div>))}
        </section>
        <button onClick={()=> setPage(page+1)} disabled={users&&users.length < limit}>Next</button>
      </main>
      
    </div>
  );
}
