import React, { useState } from 'react';
import BootSequence from './components/BootSequence';
import Desktop from './components/Desktop';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted ? <BootSequence onFinish={() => setBooted(true)} /> : <Desktop />}
    </>
  );
}

export default App;