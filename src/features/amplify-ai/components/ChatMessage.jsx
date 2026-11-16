import React from 'react';
import styles from '../styles/ChatMessages.module.css';

/**
 * Lightweight safe Markdown-like formatter for AI responses
 * Handles **bold**, *italics*, bullet points, and [links](url)
 */
function renderFormattedContent(text) {
  if (!text) return null;

  // Split by double newlines into paragraphs
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((para, pIdx) => {
    // Check if paragraph is a bullet list
    const lines = para.split('\n');
    const isList = lines.every(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('* '));

    if (isList) {
      return (
        <ul key={pIdx}>
          {lines.map((line, lIdx) => {
            const clean = line.replace(/^[•\-\*]\s*/, '');
            return <li key={lIdx}>{formatInline(clean)}</li>;
          })}
        </ul>
      );
    }

    return (
      <p key={pIdx}>
        {lines.map((line, lIdx) => (
          <React.Fragment key={lIdx}>
            {formatInline(line)}
            {lIdx < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    );
  });
}

function formatInline(str) {
  // Simple token regex for bold and links
  const parts = [];
  let remaining = str;

  // Match links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  // Match bold: **text**
  const boldRegex = /\*\*([^*]+)\*\*/;

  let key = 0;
  while (remaining) {
    const linkMatch = remaining.match(linkRegex);
    const boldMatch = remaining.match(boldRegex);

    let firstMatch = null;
    let matchType = null;

    if (linkMatch && boldMatch) {
      if (linkMatch.index < boldMatch.index) {
        firstMatch = linkMatch;
        matchType = 'link';
      } else {
        firstMatch = boldMatch;
        matchType = 'bold';
      }
    } else if (linkMatch) {
      firstMatch = linkMatch;
      matchType = 'link';
    } else if (boldMatch) {
      firstMatch = boldMatch;
      matchType = 'bold';
    }

    if (firstMatch) {
      const matchIdx = firstMatch.index;
      if (matchIdx > 0) {
        parts.push(remaining.substring(0, matchIdx));
      }

      if (matchType === 'link') {
        parts.push(
          <a
            key={key++}
            href={firstMatch[2]}
            target={firstMatch[2].startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >
            {firstMatch[1]}
          </a>
        );
      } else if (matchType === 'bold') {
        parts.push(<strong key={key++}>{firstMatch[1]}</strong>);
      }

      remaining = remaining.substring(matchIdx + firstMatch[0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts;
}

export default function ChatMessage({ message, avatarImage }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`${styles.messageRow} ${isUser ? styles.userRow : styles.aiRow}`}>
      {!isUser && (
        <div className={styles.avatarMini}>
          <img src={avatarImage || '/models/poses/EXPLAINING.jpg'} alt="Amplify AI" />
        </div>
      )}

      <div className={`${styles.messageBubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        {renderFormattedContent(message.text)}
        <div className={styles.timestamp}>{message.timestamp}</div>
      </div>
    </div>
  );
}
