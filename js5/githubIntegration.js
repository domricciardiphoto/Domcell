const GITHUB_API_URL = 'https://api.github.com';
let authToken = null;
let repositoryName = null;
let username = null;

// Function to authenticate the user with GitHub
function authenticateWithGitHub() {
    const clientId = 'YOUR_GITHUB_CLIENT_ID';  // Replace with your GitHub OAuth App Client ID
    const redirectUri = 'YOUR_REDIRECT_URI';   // Replace with your redirect URI

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;

    // Open GitHub authentication page
    window.open(authUrl, '_blank');
    
    // Listen for the redirect and retrieve the auth code
    window.addEventListener('message', async (event) => {
        if (event.origin !== window.location.origin) return;
        
        const code = event.data.code;
        if (code) {
            try {
                const response = await fetch('YOUR_SERVER_ENDPOINT_FOR_EXCHANGE', {  // Replace with your server endpoint to exchange code for token
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }),
                });
                const data = await response.json();
                authToken = data.access_token;
                username = await getGitHubUsername();
                alert('Successfully authenticated with GitHub');
            } catch (error) {
                console.error('GitHub Authentication Error:', error);
                alert('Failed to authenticate with GitHub');
            }
        }
    });
}

// Function to get the authenticated user's GitHub username
async function getGitHubUsername() {
    try {
        const response = await fetch(`${GITHUB_API_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        return data.login;
    } catch (error) {
        console.error('Error fetching GitHub username:', error);
        return null;
    }
}

// Function to create a new GitHub repository
async function createGitHubRepo(repoName) {
    if (!authToken) {
        alert('Please authenticate with GitHub first.');
        return;
    }

    repositoryName = repoName;

    try {
        const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: repositoryName,
                private: false,  // Set to true if you want the repository to be private
            }),
        });
        const data = await response.json();
        alert(`Repository "${repositoryName}" created successfully.`);
    } catch (error) {
        console.error('Error creating GitHub repository:', error);
        alert('Failed to create GitHub repository');
    }
}

// Function to commit changes to the repository
async function commitChanges(commitMessage, codeContent) {
    if (!authToken || !repositoryName || !username) {
        alert('Please ensure you are authenticated and have a repository created.');
        return;
    }

    try {
        const branchName = 'electron-app-branch';
        
        // Step 1: Check if the branch exists
        let branchExists = true;
        try {
            await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/refs/heads/${branchName}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
        } catch (error) {
            branchExists = false;
        }

        if (!branchExists) {
            // Create the branch based on the latest commit on main
            const refResponse = await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/refs/heads/main`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const refData = await refResponse.json();
            const latestCommitSha = refData.object.sha;

            await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/refs`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ref: `refs/heads/${branchName}`,
                    sha: latestCommitSha,
                }),
            });
        }

        // Step 2: Get the latest commit SHA on the branch
        const branchRefResponse = await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/refs/heads/${branchName}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        const branchRefData = await branchRefResponse.json();
        const branchLatestCommitSha = branchRefData.object.sha;

        // Step 3: Get the tree SHA of the latest commit
        const commitResponse = await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/commits/${branchLatestCommitSha}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        const commitData = await commitResponse.json();
        const treeSha = commitData.tree.sha;

        // Step 4: Create a new tree with the updated content in a unique directory
        const newTreeResponse = await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/trees`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                base_tree: treeSha,
                tree: [{
                    path: `electron-app/index.html`,  // Save the file in a unique directory
                    mode: '100644',
                    type: 'blob',
                    content: codeContent,
                }],
            }),
        });
        const newTreeData = await newTreeResponse.json();
        const newTreeSha = newTreeData.sha;

        // Step 5: Create a new commit referencing the new tree
        const newCommitResponse = await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/commits`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: commitMessage,
                tree: newTreeSha,
                parents: [branchLatestCommitSha],
            }),
        });
        const newCommitData = await newCommitResponse.json();
        const newCommitSha = newCommitData.sha;

        // Step 6: Update the reference of the branch to point to the new commit
        await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/git/refs/heads/${branchName}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sha: newCommitSha,
            }),
        });

        alert('Changes committed successfully to the electron-app-branch.');
    } catch (error) {
        console.error('Error committing changes to GitHub:', error);
        alert('Failed to commit changes to GitHub');
    }
}

// Function to push changes to GitHub (already included in the commit process above)

// Function to pull the latest code from the GitHub repository
async function pullFromGitHub() {
    if (!authToken || !repositoryName || !username) {
        alert('Please ensure you are authenticated and have a repository created.');
        return;
    }

    try {
        const response = await fetch(`${GITHUB_API_URL}/repos/${username}/${repositoryName}/contents/index.html`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        const fileContent = atob(data.content);

        // Display or update the file content in your application as needed
        alert('Latest code pulled from GitHub.');
        return fileContent;
    } catch (error) {
        console.error('Error pulling code from GitHub:', error);
        alert('Failed to pull code from GitHub');
    }
}

// Helper function to decode base64
function atob(input) {
    return Buffer.from(input, 'base64').toString('utf-8');
}
