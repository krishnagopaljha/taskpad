document.addEventListener('DOMContentLoaded', () => {
  const note = document.getElementById('note');
  const status = document.getElementById('status');
  const downloadBtn = document.getElementById('downloadBtn');

  // Load saved note
  chrome.storage.sync.get('quickNote', (data) => {
    if (data.quickNote) {
      note.value = data.quickNote;
    }
  });

  // Autosave on input
  note.addEventListener('input', () => {
    chrome.storage.sync.set({ quickNote: note.value }, () => {
      status.textContent = 'Saved!';
      setTimeout(() => {
        status.textContent = 'Notes are saved automatically.';
      }, 1000);
    });
  });

  // Download note as TXT file
  downloadBtn.addEventListener('click', () => {
    const text = note.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quick_note.txt';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  });
});
