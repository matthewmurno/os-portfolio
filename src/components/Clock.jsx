import React, { useEffect, useState } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="clock">{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>;
}

export default Clock;