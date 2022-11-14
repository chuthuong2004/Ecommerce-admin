import { createContext, useContext } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:1337', { rejectUnauthorized: false });
const SocketContext = createContext({ socket });
function SocketsProvider(props: any) {
  return <SocketContext.Provider value={{ socket }} {...props} />;
}

export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
