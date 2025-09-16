import React, { useState, useEffect } from 'react';

const TypewriterFlag = () => {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/636865')
      .then(response => response.text())
      .then(data => {
        setFlag(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error while loading the flag:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && flag) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayedText(flag.substring(0, currentIndex + 1));
        currentIndex++;
        
        if (currentIndex >= flag.length) {
          clearInterval(interval);
        }
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [loading, flag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {displayedText.split('').map((char, index) => (
        <li key={index} style={{ marginRight: '2px' }}>
          {char}
        </li>
      ))}
    </ul>
  );
};
/*(() => {
  const urlChars = [];
  const bElements = Array.from(document.querySelectorAll('b.ref[value]'));

  bElements.forEach(b => {
    // Traverse ancestors up to <section> to validate the pattern
    let section = b.closest('section[data-id]');
    let article = b.closest('article[data-class]');
    let div = b.closest('div[data-tag]');

    if (!section || !article || !div) return;

    const sectionData = section.getAttribute('data-id');
    const articleData = article.getAttribute('data-class');
    const divData = div.getAttribute('data-tag');

    if (
      sectionData.startsWith('92') &&
      articleData.endsWith('45') &&
      divData.includes('78')
    ) {
      urlChars.push(b.getAttribute('value'));
    }
  });

  const hiddenLink = urlChars.join('');
  console.log("Hidden Link:", hiddenLink);
})(); */
export default TypewriterFlag;