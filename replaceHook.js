const fs = require('fs');

function replaceIsMobile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not exists
  if (!content.includes('useIsMobile')) {
    content = content.replace(/import {.*?from "react";/, match => match + '\nimport { useIsMobile } from "../hooks/use-is-mobile";');
    if(content.indexOf('useIsMobile') === -1) {
       content = content.replace(/import {.*?from 'react';/, match => match + '\nimport { useIsMobile } from "../hooks/use-is-mobile";');
    }
  }

  // Replace useState
  content = content.replace(/const \[isMobile, setIsMobile\] = useState\(false\);/, 'const isMobile = useIsMobile();');

  // Remove useEffect for resize (this is hacky but we'll try to remove the specific block)
  // Let's use a simpler approach: just find the useEffect that contains window.addEventListener("resize"
  // and remove it.
  
  // Since regex multiline replace can be tricky in JS, I'll let multi_replace_file_content do it, or just do it here.
  const lines = content.split('\n');
  let newLines = [];
  let inResizeEffect = false;
  let bracesCount = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (line.includes('window.addEventListener("resize"') || line.includes("window.addEventListener('resize'")) {
       // We know the effect started a few lines above.
       // We shouldn't do this purely line-based without AST if we can avoid it.
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// replaceIsMobile('src/app/components/Products.tsx');
// replaceIsMobile('src/app/components/HowWeWork.tsx');
// replaceIsMobile('src/app/components/About.tsx');
// replaceIsMobile('src/app/components/Testimonials.tsx');

