import { useEffect, useState } from "react";
import { emptyEvent } from "../../../definitions/definition.js";
import './waitingMonitor.css';

export const WaitingMonitor = ({event=emptyEvent}) => {
    const [users, setUsers] = useState<any[]>([]);
    useEffect(()=>{
        let newUsers:any[] = [];
        for(const id in event.users) {
            newUsers.push(event.users[id]);
        }
        setUsers(newUsers);
    },[event]);
  return (
    <div className="monitor-container">
        <div className="monitor-waiting-preview-users-container">
            {users.map((user, index)=><div className="monitor-waiting-user-preview" key={index}>{user.name}</div>)}
        </div>
    </div>
  )
}
