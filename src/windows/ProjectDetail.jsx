import React from 'react';
import AppWindow from '../components/AppWindow';

function ProjectDetail({ project, onClose, onFocus, style = {}, zIndex }) {
  if (!project) return null;

  return (
    <AppWindow
      title={project.name}
      onClose={onClose}
      onFocus={onFocus}
      style={{ ...style, zIndex }}
    >
      {project.content}
    </AppWindow>
  );
}

export default ProjectDetail;