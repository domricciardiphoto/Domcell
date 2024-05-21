document.getElementById('saveVersionBtn').addEventListener('click', async () => {
    const projectId = 1; // Example project id
    const content = document.getElementById('pullthecode3').innerHTML; // Get the current content

    const response = await window.api.saveVersion({ projectId, content });
    alert(response.message);
    loadVersions(projectId); // Reload versions after saving
});

async function loadVersions(projectId) {
    const versions = await window.api.getVersions(projectId);
    const versionList = document.getElementById('versionList');
    versionList.innerHTML = '';
    versions.forEach(version => {
        const option = document.createElement('option');
        option.value = version.version_number;
        option.text = `Version ${version.version_number} - ${new Date(version.created_at).toLocaleString()}`;
        versionList.add(option);
    });
}

document.getElementById('revertVersionBtn').addEventListener('click', async () => {
    const projectId = 1; // Example project id
    const versionNumber = document.getElementById('versionList').value;

    const content = await window.api.revertVersion({ projectId, versionNumber });
    document.getElementById('pullthecode3').innerHTML = content;
});

// Call loadVersions when the project is loaded
loadVersions(1); // Example project id