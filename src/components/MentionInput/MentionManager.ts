import { MentionOption } from './index';

export class MentionManager {
  private content: string = '';
  private mentions: Map<string, MentionOption> = new Map();

  updateContent(html: string) {
    this.content = html;
    this.updateMentions();
  }

  private updateMentions() {
    this.mentions.clear();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.content;
    
    const mentionSpans = tempDiv.querySelectorAll('span.mention-item');
    mentionSpans.forEach((span) => {
      const id = span.getAttribute('data-id');
      if (id) {
        const name = span.textContent;
        if (name) {
          this.mentions.set(id, { id, name });
        }
      }
    });
  }

  getData(): Array<string | MentionOption> {
    const result: Array<string | MentionOption> = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.content;

    let currentText = '';

    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        currentText += node.textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        if (element.classList?.contains('mention-item')) {
          // Push accumulated text if exists
          if (currentText) {
            result.push(currentText);
            currentText = '';
          }
          
          // Push mention object
          const id = element.getAttribute('data-id');
          if (id && this.mentions.has(id)) {
            result.push(this.mentions.get(id)!);
          }
        } else {
          // Recursively process child nodes
          node.childNodes.forEach(processNode);
        }
      }
    };

    tempDiv.childNodes.forEach(processNode);

    // Push any remaining text
    if (currentText) {
      result.push(currentText);
    }

    return result;
  }
} 