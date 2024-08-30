const matrixDiv = document.querySelector('.openthematrix[mymatrix="mymatrix1"]');

document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal2');

    // Create an input element for user commands
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'terminal-input';
    terminal.appendChild(inputField);

    // Utility function to print text to the terminal
    function printToTerminal(text) {
        const newLine = document.createElement('div');
        newLine.textContent = text;
        terminal.insertBefore(newLine, inputField); // Insert above the input field
        terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to the bottom
    }


    function removeEmptyTags() {
        // Get the div element by ID
        const contentDiv = document.getElementById('pullthecode2');
        const terminal = document.querySelector('.terminal');
        let emptyTagsCount = 0;
    
        // Define the tags to check
        const tagsToCheck = ['h2', 'h3', 'h4', 'h5', 'p'];
    
        // Loop through each tag type
        tagsToCheck.forEach(tag => {
            // Select all instances of the tag within the content div
            const elements = contentDiv.querySelectorAll(tag);
    
            // Loop through each element and remove it if it's empty
            elements.forEach(element => {
                if (element.innerHTML.trim() === '') {
                    element.remove();
                    emptyTagsCount++;
                }
            });
        });
    
        // Append appropriate message to .terminal based on the result
        if (emptyTagsCount > 0) {
            $('.terminal-input').before(`<div>${emptyTagsCount} empty tag(s) found and removed.</div>`);
            
            matrixDiv.click();
        } else {
            $('.terminal-input').before('<div>No empty tags found.</div>');
        }
    }

    async function listFilesInTerminal2() {
        try {
            $('.terminal-input').before('Fetching files from GitHub...<br>');
            const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
    
            if (response.ok) {
                const files = await response.json();
                $('.terminal-input').prepend('Files fetched:<br>');
    
                // Clear any existing items in .terminal2
    
                // Populate .terminal2 with file names
                files.forEach(file => {
                    $('.terminal-input').before(`<li>${file.name}</li>`);
                });
            } else {
                $('.terminal-input').before(`Failed to list files: ${response.status} ${response.statusText}<br>`);
            }
        } catch (error) {
            $('.terminal-input').before(`Error fetching files: ${error.message}<br>`);
        }
    }

    function loadFromTheCloud(filename21) {
        // Find all the list items in #fileList
        const fileItems = document.querySelectorAll('#fileList li');
    
        // Loop through each item to find the matching filename
        fileItems.forEach(item => {
            const fileSpan = item.querySelector('div > span');
            
            // Check if the span's text matches the filename
            if (fileSpan && fileSpan.textContent.trim() === filename21.trim()) {
                const loadButton = item.querySelector('button:nth-child(2)'); // Select the "Load" button
                if (loadButton) {
                    loadButton.click(); // Click the "Load" button
                    console.log(`Loaded file: ${filename21}`);
                } else {
                    console.error('Load button not found.');
                }
            }
        });
    }

    // Function to handle the input command
    function handleCommand(command) {
        const [cmd, ...args] = command.split(' ');

        switch (cmd.toLowerCase()) {
            case 'help':
              
              //  printToTerminal("load <filename> - Load a file from GitHub");
               // printToTerminal("update <filename> - Update the current file on GitHub");
              //  printToTerminal("create <filename> - Create a new file on GitHub");
              //  printToTerminal("switch <tab_name> - Switch to a different tab");
              // printToTerminal("import <url> - Import content from a URL into the editor");
                printToTerminal("Available commands:");
                printToTerminal("help - Display this help text");
                printToTerminal("import <google> | <word> - import file from Google Docs or Word");
                printToTerminal("list - List all files in the Cloud");
                printToTerminal("load <filename> - Load File the Cloud");
                printToTerminal("fetch - Open Fetch Interface");
                printToTerminal("schema - <type> - article or faq  Title URL");
                printToTerminal("schedule - <start_date> <end_date> - Schedule content display between dates EX: 2024/10/15 2024/12/31");
                printToTerminal("save - Save the current tab's content");
                printToTerminal("clear - Clear the terminal");
                printToTerminal("refresh - Refresh and reload the current file");
                printToTerminal('restart - Restart with a clean workspace')
                break;

            case 'clear':
                terminal.innerHTML = ''; // Clear terminal
                terminal.appendChild(inputField); // Re-add input field
                printToTerminal("Cleared");
                break;

            case 'list':
                listFilesInTerminal2()
                break;

            case 'refresh':
                $('#clearandrestartbuttonrefresh').click()
                break;

            case 'save':
                $('#savetomemory').click();
                break;

                case 'load':
                    if (args.length > 0) {
                        const filename21 = args.join(' '); // Join all elements of args into a single string
                        alert(filename21)
                        loadFromTheCloud(filename21);
                    } else {
                        printToTerminal('load <filename>');
                    }
                    break;


             case 'import':
                if (args[0] === 'google') {
                    $('#box12u').click()
                } else if (args[0] === 'word') {
                    $('#box7u').click()
                }
            
             break

            case 'restart':
                $('#clearandrestartbutton').click()  
            break

            case 'clean':
                removeEmptyTags();
                break;

            case 'fetch':
                if (args[0]) fetchDataFromURL(args[0]);
                else printToTerminal("Opened fetch Interface");
                $('#fecthID').click();
                break;

            case 'schema':
                if (args[0]) generateJsonSchema(args[0] , args[1] , args[2]);
                else printToTerminal("Usage: schema <type>");
                
                $('.schemalayer').remove();
                const htmlInput = $('#pullthecode2').html();
                const pageTitle = args[1]
                const pageUrl = args[2] // Get the URL from input
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlInput, 'text/html');
                let schema = {};
            
                if (args[0] === 'article') {
                    schema = generateArticleSchema(doc, pageTitle, pageUrl);
                } else if (args[0] === 'faq') {
                    schema = generateFaqSchema(doc, pageUrl);
                }
            
                if (pageTitle === '') {
                    return false;
                } else {
                    $('#pullthecode3').append('<div class="width100c layoutpale layoutpale100 liverow onblock schemalayer"><script type="application/ld+json">' + JSON.stringify(schema, null, 2));
                    $('#beautycode').val($('#pullthecode3').html());
                }

                break;

            case 'schedule':
                if (args.length >= 2) scheduleContent(args[0], args[1]);
                else printToTerminal("Usage: schedule <start_date> <end_date>");
                $('.timekeeper').remove()
                startDateText = args[0] 
                endDateText  = args[1]           
                myschedule = `<div class="timekeeper width100c layoutpale layoutpale100 liverow  onblock"><script class="timekeeper21">
                document.addEventListener('DOMContentLoaded', function () {
                var startDate = new Date('${startDate}');
                var endDate = ${endDate ? 'new Date(\'' + endDate + '\')' : 'null'};
                if (endDate) {
                endDate.setDate(endDate.getDate() + 1); 
                }
                var currentDate = new Date();
                var elements = document.querySelectorAll('.totalinternalcontent');
                if (currentDate >= startDate && (!endDate || currentDate < endDate)) {
                elements.forEach(function (element) {
                element.style.display = 'block';
                });
                } else {
                elements.forEach(function (element) {
                element.style.display = 'none';
                });
                }
                });
                <\/script></div>`;
                $('#pullthecode3').append(myschedule)
                break;

            default:
                printToTerminal(`Command not found: ${cmd}`);
        }
    }

    // Listen for the 'Enter' key to process commands
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputField.value.trim();
            if (command) {
                printToTerminal(`> ${command}`);
                handleCommand(command);
            }
            inputField.value = ''; // Clear the input field
        }
    });

    // Initialize terminal
    function startTerminal() {
        printToTerminal("Welcome to the terminal!");
        printToTerminal("Type 'help' for a list of commands.");
        inputField.focus(); // Focus the input field initially
    }

    startTerminal();
    
    // Keep the input field focused
    terminal.addEventListener('click', () => inputField.focus());
});
