document.getElementById('convertBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFileInput');
    const progressBar = document.getElementById('progressBar');
    const statusReport = document.getElementById('statusReport');
    let convertedCount = 0;
    let failedCount = 0;

    // Retrieve user settings
    const includeHeader = document.getElementById('includeHeader').checked;
    const filenameSuffix = document.getElementById('filenameSuffix').value || '';

    if (fileInput.files.length > 0) {
        progressBar.style.width = '0%'; // Reset progress bar
        progressBar.innerText = '0%';
        const totalFiles = fileInput.files.length;
        Array.from(fileInput.files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const csvContent = event.target.result;
                    const vttContent = csvToVtt(csvContent, includeHeader);
                    downloadVttFile(vttContent, file.name.replace('.csv', '') + filenameSuffix + '.vtt');
                    convertedCount++;
                } catch (error) {
                    console.error("Conversion failed for file:", file.name, error);
                    failedCount++;
                }
                updateProgress(index + 1, totalFiles);
            };
            reader.onerror = () => {
                console.error("Failed to read file:", file.name);
                failedCount++;
                updateProgress(index + 1, totalFiles);
            };
            reader.readAsText(file);
        });
    } else {
        alert('Please select at least one CSV file.');
    }

    function updateProgress(processedFiles, totalFiles) {
        const progressPercentage = (processedFiles / totalFiles) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.innerText = `${progressPercentage.toFixed(0)}%`;

        if (processedFiles === totalFiles) {
            statusReport.innerHTML = `Conversion completed. Success: ${convertedCount}, Failed: ${failedCount}`;
        }
    }
});

function csvToVtt(csvText, includeHeader) {
    let vttText = includeHeader ? "WEBVTT\n\n" : "";
    const lines = csvText.split("\n");
    lines.forEach((line, index) => {
        if (line.trim()) {
            const parts = line.split(",");
            if (parts.length >= 3) {
                const startTime = parts[0].trim();
                const endTime = parts[1].trim();
                const text = parts.slice(2).join(",").trim();
                vttText += `${index}\n${startTime} --> ${endTime}\n${text}\n\n`;
            }
        }
    });
    return vttText;
}

function downloadVttFile(vttText, filename) {
    const blob = new Blob([vttText], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none"; // Hide the element
    a.href = url;
    a.download = filename; // Set the download name
    a.className = "outsidelink"; // Prevent modal trigger
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}