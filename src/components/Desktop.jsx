import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import StartMenu from './StartMenu';
import AboutMe from '../windows/AboutMe';
import Projects from '../windows/Projects';
import Taskbar from './Taskbar';
import Tutorial from '../windows/Tutorial';
import Experience from '../windows/Experience';
import Contact from '../windows/Contact';
import ProjectDetail from '../windows/ProjectDetail';

import styles from '../styles/Desktop.module.css';
import iconStyles from '../styles/Icon.module.css';

function Desktop() {
  const [openApps, setOpenApps] = useState([]);
  const [zCounter, setZCounter] = useState(1);
  const [showTutorial, setShowTutorial] = useState(false);

  const [apps, setApps] = useState([
    { id: 'about', label: 'About Me', icon: '/icons/this_pc.png' },
    { id: 'projects', label: 'Projects', icon: '/icons/folder.png' },
    { id: 'experience', label: 'Exp.log', icon: '/icons/log.png' },
    { id: 'contact', label: 'Contact.sh', icon: '/icons/terminal.png' },
  ]);

  const [deletedApps, setDeletedApps] = useState([]);
  const [system32Visible, setSystem32Visible] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);

  const handleDragStart = (e, appId) => {
    console.log(`Dragging: ${appId}`);
    e.dataTransfer.setData('appId', appId);
    
  };

  const handleDropToRecycleBin = (e) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('appId');
    console.log('Dropped:', appId);

    if (!appId) {
      console.warn('No appId received from drag event');
      return;
    }

    if (appId === 'system32') {
      alert("Critical system file deleted. Shutting down...");
      setIsShutdown(true);
      return;
    }

    const remaining = apps.filter(app => app.id !== appId);
    console.log('Remaining apps:', remaining.map(a => a.id));

    setApps(remaining);
    setDeletedApps(prev => [...prev, appId]);

    if (remaining.length === 0 && !system32Visible) {
      setSystem32Visible(true);
      setApps([{ id: 'system32', label: 'System32', icon: '/icons/recycle.png' }]);
    }
  };

  useEffect(() => {
    const hasSeenTutorial = sessionStorage.getItem('seenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    sessionStorage.setItem('seenTutorial', 'true');
    setShowTutorial(false);
  };

  function openApp(type, payload = {}) {
    const id = Date.now();
    const baseZ = zCounter + 1;

    let style = {};
    if (type === 'experience') {
      style = { top: '80px', left: '120px', width: '720px', height: 'auto' };
    } else if (type === 'contact') {
      style = { top: '100px', left: '140px', width: '720px', height: '355px' };
    }

    setOpenApps((apps) => [
      ...apps,
      { id, type, zIndex: baseZ, style, ...payload },
    ]);
    setZCounter(baseZ);
  }

  function bringToFront(id) {
    setZCounter(prev => {
      const newZ = prev + 1;
      setOpenApps((apps) =>
        apps.map((app) =>
          app.id === id ? { ...app, zIndex: newZ } : app
        )
      );
      return newZ;
    });
  }

  function getAppComponent(type) {
    switch (type) {
      case 'about':
        return AboutMe;
      case 'projects':
        return Projects;
      case 'projectDetail':
        return ProjectDetail;
      case 'tutorial':
        return Tutorial;
      case 'experience':
        return Experience;
      case 'contact':
        return Contact;
      default:
        return null;
    }
  }

  return (
    <div className={styles.desktop}>
      <div
        onDrop={handleDropToRecycleBin}
        onDragOver={(e) => e.preventDefault()}
        className={iconStyles.icon}
      >
        <img src="/icons/recycle.png" alt="Trash" width="64" height="64" />
        <span>Trash</span>
      </div>
      {apps.map((app) => (
        <Icon
          key={app.id}
          label={app.label}
          icon={app.icon}
          onClick={() => openApp(app.id)}
          draggable={false}
          onDragStart={(e) => handleDragStart(e, app.id)}
          onDragEnd={(e) => handleDropToRecycleBin(e, app.id)}
        />
      ))}
      <StartMenu setActiveApp={(app) => openApp(app)} />
      <Taskbar onStartClick={() => console.log('Start menu clicked')} />

      {openApps.map((app) => {
        const AppComponent = getAppComponent(app.type);

        return (
          <AppComponent
          key={app.id}
          onClose={() => setOpenApps((apps) => apps.filter((a) => a.id !== app.id))}
          onFocus={() => bringToFront(app.id)}
          style={{ zIndex: app.zIndex }}
          {...(app.type === 'projects' && {
            launchProject: (project) => openApp('projectDetail', { project }),
          })}
          {...app}
        />
        );
      })}

      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
      {isShutdown && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'black',
          zIndex: 9999
        }}
      />
    )}
    </div>
  );

  function closeApp(id) {
    setOpenApps((apps) => apps.filter((app) => app.id !== id));
  }
}

export default Desktop;