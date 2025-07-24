import React, { useState, useEffect } from 'react';
import AppWindow from '../components/AppWindow';
import { Typewriter } from 'react-simple-typewriter';
import styles from '../styles/Contact.module.css';



function Contact({ onClose, onFocus, zIndex, style = {}, id }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [finishedLines, setFinishedLines] = useState([]);
  const [commandInput, setCommandInput] = useState('');
  const [commandLog, setCommandLog] = useState([]);

  const logLines = [
  'Initiating external contact protocol...',
  'Available channels:',
  'email: mattmurno@gmaill.com',
  'linkedin: linkedin.com/in/matthewmurno',
  'github: github.com/mattmurno',
  'Message link established. Awaiting transmission.',
];

function renderLine(line) {
  if (line.includes('email:')) {
    const email = line.split('email: ')[1];
    return (
      <pre>
        email: <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a>
      </pre>
    );
  }

  if (line.includes('linkedin:')) {
    const link = line.split('linkedin: ')[1];
    return (
      <pre>
        linkedin:{' '}
        <a href={`https://${link}`} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </pre>
    );
  }

  if (line.includes('github:')) {
    const link = line.split('github: ')[1];
    return (
      <pre>
        github:{' '}
        <a href={`https://${link}`} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </pre>
    );
  }

  return <pre>{line}</pre>;
}

function checkCommand(line) {
  if (line.trim() === "download('resume')") {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Matthew_Murno_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

  useEffect(() => {
    if (currentLine < logLines.length) {
      const delay = logLines[currentLine].length * 30 + 500;

      const timer = setTimeout(() => {
        setFinishedLines((prev) => [...prev, logLines[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  function handleCommandSubmit(e) {
    e.preventDefault();

    const trimmed = commandInput.trim();
    setCommandLog((prev) => [...prev, `> ${trimmed}`]);

    if (trimmed === "download resume") {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Matthew_Murno_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCommandLog((prev) => [...prev, "Downloading resume..."]);
    } else {
      setCommandLog((prev) => [...prev, `Unknown command: ${trimmed}`]);
    }

    setCommandInput('');
  }

  return (
    <AppWindow
      title="contact.sh"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      style={{ ...style, zIndex }}
      id={id}
    >
      <div className={styles.contactContainer}>
        {finishedLines.map((line, i) => (
          <React.Fragment key={i}>{renderLine(line)}</React.Fragment>
        ))}

        {currentLine < logLines.length && (
          <pre key={`typing-${currentLine}`}>
            <Typewriter
              words={[logLines[currentLine]]}
              cursor
              cursorStyle="_"
              typeSpeed={30}
              deleteSpeed={0}
              delaySpeed={100000}
            />
          </pre>
        )}


        {currentLine === logLines.length && (
          <form onSubmit={handleCommandSubmit} className={styles.inputLine}>
          <span className={styles.prompt}>&gt;</span>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                className={styles.terminalInput}
                autoFocus
              />
              <span className={styles.cursor} />
            </div>
          </form>
        )}
      
      </div>
    </AppWindow>
  );
}

export default Contact;