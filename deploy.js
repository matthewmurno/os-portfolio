const ghpages = require('gh-pages');

ghpages.publish(
  'dist',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/matthewmurno/os-portfolio.git',
    message: 'Deploy portfolio',
    user: {
      name: 'Matthew Murno',
      email: 'your-email@example.com',
    },
  },
  (err) => {
    if (err) {
      console.error('Deploy failed:', err);
    } else {
      console.log('Deploy successful!');
    }
  }
);