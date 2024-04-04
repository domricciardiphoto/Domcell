
function csvToVtt(csvText) {
    let vttText = "WEBVTT\n\n";
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
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('convertBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFileInput');
    if (fileInput.files.length > 0) {
        Array.from(fileInput.files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const csvContent = event.target.result;
                const vttContent = csvToVtt(csvContent);
                downloadVttFile(vttContent, file.name.replace('.csv', '') + '.vtt');
            };
            reader.readAsText(file);
        });
    } else {
        alert('Please select at least one CSV file.');
    }
});