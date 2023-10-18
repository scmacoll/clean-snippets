export function cleanCode(inputArea, outputArea) {
  console.log("cleanCode Button pressed!!")
  let cleanedCode = inputArea.value;
  cleanedCode = cleanSVGs(cleanedCode);
  cleanedCode = cleanComments(cleanedCode);
  cleanedCode = cleanImports(cleanedCode);
  cleanedCode = cleanBlankLines(cleanedCode);
  cleanedCode = wrapLines(cleanedCode);
  cleanedCode = cleanWhitespace(cleanedCode);

  outputArea.value = cleanedCode;

  return cleanedCode;
}

function cleanSVGs(code) {
  if(document.getElementById('clean-svg-toggle').checked) {
    code = code.replace(/<svg[\s\S]*?<\/svg>/g, '<svg></svg>');
  }
  return code;
}

function cleanComments(code) {
  if(document.getElementById('clean-comments-toggle').checked) {
    // Remove single-line comments for languages like C++, Java, C#, JavaScript, etc.
    code = code.replace(/^\s*\/\/.*\n?/gm, '')
      // Remove multi-line comments for languages like C++, Java, C#, etc.
      .replace(/\/\*[\s\S]*?\*\/\s*\n?/g, '')
      // Remove single-line comments for languages like Python, Ruby, etc.
      .replace(/^\s*#.*\n?/gm, '')
      // Remove multi-line comments for Python (triple quotes)
      .replace(/'''[\s\S]*?'''\s*\n?/g, '')
      .replace(/"""[\s\S]*?"""\s*\n?/g, '')
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->\s*\n?/g, '')
      // Extra removal for inline comments n languages like Python and Ruby (without removing the entire line)
      .replace(/\s*#.*$/gm, '');
  }
  return code;
}

function cleanImports(code) {
  if(document.getElementById('clean-imports-toggle').checked) {
    code = code.replace(/^import .*;\s+/gm, '')       // For JavaScript imports
      .replace(/^import .*\s+/gm, '')       // For Python imports
      .replace(/^from .* import .*\s+/gm, ''); // For Python 'from' imports
  }
  return code;
}

function cleanBlankLines(code) {
  if(document.getElementById('clean-blank-lines-toggle').checked) {
    code = code.replace(/^\s*[\r\n]/gm, '');
  }
  return code;
}

function wrapLines(code) {
  if (document.getElementById('clean-wrap-toggle').checked) {
    const maxLineLength = 250;
    const lines = code.split('\n');
    let reformattedCode = '';
    let currentLine = '';

    for (let line of lines) {
      line = line.trim(); // remove spaces from the beginning and end

      if ((currentLine + ' ' + line).length <= maxLineLength) {
        currentLine += ' ' + line;
      } else {
        reformattedCode += currentLine + '\n';
        currentLine = line;
      }

      if (currentLine.includes(';') || line === '') {
        reformattedCode += currentLine + '\n';
        currentLine = '';
      }
    }

    // Add any remaining content
    if (currentLine) {
      reformattedCode += currentLine;
    }
    code = reformattedCode; // Update code with reformattedCode
  }
  return code;
}

function cleanWhitespace(code) {
  if(document.getElementById('clean-whitespace-toggle').checked) {
    code = code.replace(/([;{}])\s+/g, '$1')
      .replace(/\s+([;{}])/g, '$1')
      .replace(/\s+=\s+/g, '=')           // Remove spaces around equal signs
      .replace(/\s+,\s+/g, ',')           // Remove spaces around commas
      .replace(/\s+\(\s+/g, '(')          // Remove spaces inside opening parenthesis
      .replace(/\s+\)\s+/g, ')')          // Remove spaces inside closing parenthesis
      .replace(/\s+/g, ' ')               // Replace multiple spaces with single space
      .replace(/^ +| +$/gm, '');          // Remove leading and trailing spaces from each line
  }
  return code;
}

//! Add new function here //

