import { cleanCode } from "./snippet-functions.js";


const clipboardSVG = `
  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg> &nbsp;Copy`;
const checkmarkSVG = `
  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5"></path>
  </svg>`;

const clearBtn = document.getElementById('clear-button');
const cleanBtn = document.getElementById('clean-button');
const copyBtn = document.getElementById('copy-button');
const confirmationBtn = document.getElementById('confirmation-button');
const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const inputCharCount = document.getElementById('input-char-count');
const outputCharCount = document.getElementById('output-char-count');
const warningIcon = document.getElementById("output-warning-icon");

document.addEventListener('DOMContentLoaded', async (event) => {
  initializeCopyButtonsSVG();
  await loadToggleControls();
  initializeToggleCheckboxes();
  attachButtonEventListeners();
  updateCharacterCount();
});

function initializeCopyButtonsSVG() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.innerHTML = clipboardSVG;
  });
}

async function loadToggleControls() {
  try {
    const response = await fetch('toggle-controls.html');
    const html = await response.text();
    document.getElementById("toggle-controls-container").innerHTML = html;
  } catch (e) {
    console.error("Error loading toggle controls:", e);
  }
}

function initializeToggleCheckboxes() {
  const cleanAllToggle = document.getElementById('clean-all-toggle');
  const otherToggles = document.querySelectorAll('.toggle-labels input[type="checkbox"]:not(#clean-all-toggle)');

  function setAllToggles() {
    const isChecked = cleanAllToggle.checked;
    otherToggles.forEach(toggle => toggle.checked = isChecked);
  }

  function checkAllToggled() {
    cleanAllToggle.checked = Array.from(otherToggles).every(toggle => toggle.checked);
  }

  // Initialize state on page load
  setAllToggles();

  // Event listeners for toggle behavior
  cleanAllToggle.addEventListener('change', setAllToggles);
  otherToggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      if (!toggle.checked) cleanAllToggle.checked = false;
      checkAllToggled();
    });
  });
}

function attachButtonEventListeners () {
  copyBtn.addEventListener('click', () => {
    copyToClipboard('output-area')
  })
  cleanBtn.addEventListener('click', () => {
    cleanButton();
  })
  clearBtn.addEventListener('click', () => {
    clearButton();
  })
}

function updateCharacterCount() {
  const length = outputArea.value.length;
  const circle = warningIcon.querySelector("circle");
  const line = warningIcon.querySelector("line");
  const dot = warningIcon.querySelector("circle[cx='12'][cy='16']");

  // Update counts
  inputCharCount.textContent = `${inputArea.value.length} characters`;
  outputCharCount.textContent = `${outputArea.value.length} characters`;

  // Show or hide the warning icon for output character count
  if (length >= 2000 && length < 4096) {
    warningIcon.style.display = "inline";
    circle.setAttribute("stroke", "#555");
    line.setAttribute("stroke", "#555");
    dot.setAttribute("fill", "#555");
  } else if (length >= 4096 && length < 10000) {
    warningIcon.style.display = "inline";
    circle.setAttribute("stroke", "#cccc13");
    line.setAttribute("stroke", "#cccc13");
    dot.setAttribute("fill", "#cccc13");
  } else if (length >= 10000 && length < 32000) {
    warningIcon.style.display = "inline";
    circle.setAttribute("stroke", "orange");
    line.setAttribute("stroke", "orange");
    dot.setAttribute("fill", "orange");
  } else if (length >= 32000) {
    warningIcon.style.display = "inline";
    circle.setAttribute("stroke", "red");
    line.setAttribute("stroke", "red");
    dot.setAttribute("fill", "red");
  } else {
    warningIcon.style.display = "none";
  }
}

function cleanButton() {
  const checkboxes = document.querySelectorAll('.toggle-labels input[type="checkbox"]');
  const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

  if (inputArea.value.length === 0) {
    confirmationBtn.innerHTML = "Please paste code into the text area!";
  } else if (!anyChecked) {
    confirmationBtn.innerHTML = "Please select at least one cleaning option!";
  } else {
    clearButton();
    cleanCode(inputArea, outputArea);
    confirmationBtn.innerHTML = 'Cleaned &nbsp' + checkmarkSVG;
    setTimeout(() => {
      clearBtn.innerHTML = "Clear";
      clearBtn.style.display = 'inline-block';
    }, 2000);
  }

  updateCharacterCount();
  confirmationBtn.style.display = 'inline-block';

  setTimeout(() => {
    confirmationBtn.innerHTML = '';
    confirmationBtn.style.display = 'none';
  }, 2000);
}

function clearButton() {
  clearBtn.innerHTML = '';
  clearBtn.style.display = 'none';
  document.getElementById('output-area').value = '';
  updateCharacterCount();
}

function copyToClipboard(elementId) {
  console.log('<<<<     Copy Button Pressed      >>>>')
  const textarea = document.getElementById(elementId);
  textarea.select();
  if (textarea.value < 1) {
    return
  }
  document.execCommand("copy");

  const copyButtonDiv = textarea.parentElement.previousElementSibling.querySelector('.copy-div-btn');
  const copyButton = copyButtonDiv.querySelector('.copy-btn');

  copyButton.innerHTML = checkmarkSVG + "&nbsp;Copied";

  setTimeout(() => {
    copyButton.innerHTML = clipboardSVG;
  }, 2000);
}

