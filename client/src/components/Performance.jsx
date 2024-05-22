import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchLogs } from '../api';

const Performance = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const { data } = await fetchLogs(email);
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    if (email) {
      getLogs();
    }
  }, [email]);

  return (
    <div>
      <h1>Performance Page</h1>
      {email && <p>Email: {email}</p>}
      <ul>
        {logs.map((log, index) => (
          <li key={index}>Value: {log.value}, Logged at: {new Date(log.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Performance;
