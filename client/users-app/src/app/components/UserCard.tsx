"use client";

import type {User} from "../interfaces/types";
import style from "./UserCard.module.css"
export default function UserCard({user}: {user: User}) {
      const {name, email} = user;
      
      return (
        <section className="section">
        <div className={style.user}>
            <li>
               <div>Name: {name}</div>
               <div>Email: {email}</div>
            </li>
        </div>
        </section>
      )
}