import React, { useState } from 'react';
import AppWindow from '../components/AppWindow';
import styles from '../styles/Projects.module.css';

const projectList = [
  {
    id: 'eagleplan',
    name: 'EaglePlan.exe',
    icon: '/icons/disc.png',
    content: (
      <>
        <h3>EaglePlan</h3>
        <p>
          A Django app for Boston College students to plan and track graduation
          requirements. Features course filters, backend REST API, and user login.
        </p>
      </>
    ),
  },
  {
    id: 'wanderingmind',
    name: 'WanderingMind.exe',
    icon: '/icons/disc.png',
    content: (
      <>
        <h3>Wandering Mind</h3>
        <p>
          A Godot 4 pixel-art dream exploration game featuring a dream/nightmare world
          swap mechanic and hand-drawn isometric environments.
        </p>
      </>
    ),
  },
  {
    id: 'perishable',
    name: 'Perishable.exe',
    icon: '/icons/disc.png',
    content: (
      <>
        <h3>Perishable</h3>
        <p>
          A D&D-inspired roguelike with strategic character generation and a
          Balatro-style action system. Currently in development using Godot 4.
        </p>
      </>
    ),
  },
];

  function Projects({ onClose, style = {} , zIndex , onFocus, launchProject }) {
  return (
    <AppWindow title="Projects" onClose={onClose} onFocus={onFocus} style={{ ...style, zIndex }} zIndex={zIndex}>
      <div className={styles.projectFolder}>
        {projectList.map((project) => (
          <div
            key={project.id}
            className={styles.projectIcon}
            onClick={() => launchProject(project)}
          >
            <img src={project.icon} width="48" height="48" alt={project.name} />
            <span>{project.name}</span>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

export default Projects;