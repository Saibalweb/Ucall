import React from "react";
import { useMemo } from "react";
import { io } from "socket.io-client";
const SocketContext = React.createContext(null);

export const useSocket = ()=>{
    const socket = React.useContext(SocketContext);
    if(!socket){
      throw new Error("useSocket must be used within a SocketProvider");
    }
    return socket;
}
export const SocketProvider = ({ children }) => {
    const socket = useMemo(()=>io('http://192.168.0.197:3001'), []);
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}