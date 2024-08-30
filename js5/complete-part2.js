        document.getElementById('scrape-form').addEventListener('submit', async function(event) {
            event.preventDefault();

            let url = document.getElementById('url-input').value;
            const replacement = document.getElementById('replacement-select').value;
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = 'Fetching data...';

            // Add https:// if it's not already present
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            try {
                const response = await fetch(url);
                const htmlText = await response.text();
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                const seoBannerDiv = doc.querySelector('.seo-banner-id');

                if (seoBannerDiv) {
                    // Extract the first comment from the seo-banner-id div
                    let firstComment = null;
                    for (let node of seoBannerDiv.childNodes) {
                        if (node.nodeType === Node.COMMENT_NODE) {
                            firstComment = node.nodeValue.trim();
                            break;
                        }
                    }

                    if (firstComment) {
                        let commentText = firstComment.replace(/^\[\s*|\s*\]$/g, '');
                        // Check if the comment text ends with _banner and replace it
                        if (commentText.endsWith('_banner')) {
                            commentText = commentText.replace('_banner', replacement);
                        }
                        resultDiv.textContent = commentText;
                    } else {
                        resultDiv.textContent = "No comment found in the div with class 'seo-banner-id'.";
                    }
                } else {
                    resultDiv.textContent = "ID not found: Check URL or different method required";
                }
            } catch (error) {
                resultDiv.textContent = `An error occurred: ${error.message}`;
            }
            $('#getexistingcontent , #result').show()



        });


        $('#getexistingcontent').on('click', function() {
var url = $('#url-input').val();
var replacement2 = $('#replacement-select').val();
if (url) {
    $.get(url, function(data) {
        var content;
        if (replacement2 === '_copy') {
            content = $(data).find('.seo-copy-id').find('div.content-asset').html();
        } else {
            content = $(data).find('.seo-banner-id').find('div.content-asset').html();
        }

        if (content) {
            // Parse the content to manipulate DOM elements
            var tempDiv = $('<div>').html(content);

            // Remove "https://www.pcrichard.com" from the href attributes of stylesheet links, except for a specific URL
            tempDiv.find('link[rel="stylesheet"]').each(function() {
                var href = $(this).attr('href');
                if (href && href !== 'https://www.pcrichard.com/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/v1722481309690/pim-content/Roundedmenu2024.css') {
                    $(this).attr('href', href.replace('https://www.pcrichard.com', ''));
                }
            });

            // Update <img> tags with data-src attribute
            tempDiv.find('img[data-src]').each(function() {
                $(this).attr('src', $(this).attr('data-src'));
            });

            // Get the modified content back as HTML
            content = tempDiv.html();

            $('#pullthecode3, #mobilepreview2').append('<div class="width100c layoutpale layoutpale100 liverow droppable onblock ui-droppable"><div class="width100c liveelement in910 layoutpale layoutpale100 explorerselected interedit">' + content + '</div></div>');
            $('#fetchmyid').hide();
            $('#uniqueModal').fadeOut(800)
        } else {
            $('#result').text('No content found');
        }

    }).fail(function() {
        $('#result').text('Failed to fetch the content. Please check the URL and try again.');
    });
} else {
    $('#result').text('Please enter a URL.');
}
});

  

        $('#getexistingcontent2').on('click', function() {
var url = $('#url-input2').val();
if (url) {
    $.get(url, function(data) {
        var content2 = $(data).find('.pdp-description').html();
        $('#firstmatrix').click()

        if (content2) {
            // Remove any <link> tags with rel="stylesheet"
            content2 = content2.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, '');

            // Parse the content to manipulate DOM elements
            var tempDiv = $('<div>').html(content2);

            // Update <img> tags with data-src attribute
            tempDiv.find('img[data-src]').each(function() {
                $(this).attr('src', 'https://pcrichard.com'+ $(this).attr('data-src'));
            });

            // Get the modified content back as HTML
            content2 = tempDiv.html();

            $('#pullthecode3 , #mobilepreview2').append('<div class="width100c layoutpale layoutpale100 liverow droppable onblock ui-droppable"><div class="width100c liveelement in910 layoutpale  layoutpale100 explorerselected interedit">' + content2 + '</div></div>');
            $('#fetchmyid').hide()
            $('#uniqueModal').fadeOut(800)
        } else {
            $('#result').text('No content found')
        }

    }).fail(function() {
        $('#result').text('Failed to fetch the content. Please check the URL and try again.')
    });
} else {
    $('#result').text('Please enter a URL.')
}
});





        $('#getexistingcontent3').on('click', function() {
var url3 = $('#url-input3').val();
if (url3) {
    $.get(url3, function(data) {
        var content3 = $(data).find('.details').html();
        $('#firstmatrix').click()

        if (content3) {
            // Remove any <link> tags with rel="stylesheet"
            content3 = content3.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, '');

            $('#pullthecode3 , #mobilepreview2').append('<div class="width100c layoutpale layoutpale100 liverow droppable onblock ui-droppable"><div class="width100c liveelement in910 layoutpale  layoutpale100 explorerselected interedit">'+content3+'</div></div>');
            $('#fetchmyid').hide()
            $('#uniqueModal').fadeOut(800)
        } else {
            $('#result').text('No content found')
        }

    }).fail(function() {
        $('#result').text('Failed to fetch the content. Please check the URL and try again.')
    });
} else {
    $('#result').text('Please enter a URL.')
}
});



    let currentSchemaType = 'article';
    
    function setSchemaType(schemaType) {
        currentSchemaType = schemaType;
    }
    
    function generateJsonSchema() {
        $('.schemalayer').remove();
        const htmlInput = $('#pullthecode2').html();
        const pageTitle = document.getElementById('schemapagetitle').value;
        const pageUrl = document.getElementById('schemapageurla').value; // Get the URL from input
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlInput, 'text/html');
        let schema = {};
    
        if (currentSchemaType === 'article') {
            schema = generateArticleSchema(doc, pageTitle, pageUrl);
        } else if (currentSchemaType === 'faq') {
            schema = generateFaqSchema(doc, pageUrl);
        }
    
        if (pageTitle === '') {
            return false;
        } else {
            $('#pullthecode3').append('<div class="width100c layoutpale layoutpale100 liverow onblock schemalayer"><script type="application/ld+json">' + JSON.stringify(schema, null, 2));
            $('#beautycode').val($('#pullthecode3').html());
        }
    }
    
    function generateArticleSchema(doc, title, url) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": url
            },
            "headline": title || "", // Use the title from the input field
            "content": []
        };
        const bodyChildren = doc.body.querySelectorAll('*');
        schema.content = parseHtmlElements(bodyChildren);
        return schema;
    }
    
    function generateFaqSchema(doc, url) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": url
            },
            "mainEntity": []
        };
        const bodyChildren = doc.body.querySelectorAll('*');
        schema.mainEntity = parseFaqElements(bodyChildren);
        return schema;
    }
    
    function parseHtmlElements(elements) {
        const content = [];
        elements.forEach(element => {
            const elementSchema = createElementSchema(element);
            if (elementSchema) {
                content.push(elementSchema);
            }
        });
        return content;
    }
    
    function parseFaqElements(elements) {
        const faqs = [];
        let currentQuestion = null;
        elements.forEach(element => {
            if (element.tagName.toLowerCase() === 'h2' || element.tagName.toLowerCase() === 'h3') {
                if (currentQuestion) {
                    faqs.push(currentQuestion);
                }
                currentQuestion = {
                    "@type": "Question",
                    "name": element.textContent.trim().replace(/\s+/g, ' '),
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": ""
                    }
                };
            } else if (element.tagName.toLowerCase() === 'p' && currentQuestion) {
                currentQuestion.acceptedAnswer.text += element.textContent.trim().replace(/\s+/g, ' ') + " ";
            }
        });
        if (currentQuestion) {
            faqs.push(currentQuestion);
        }
        faqs.forEach(faq => {
            faq.acceptedAnswer.text = faq.acceptedAnswer.text.trim().replace(/\s+/g, ' ');
        });
        return faqs;
    }
    
    function createElementSchema(element) {
        let schema = null;
        const baseUrl = 'https://www.pcrichard.com';
        
        switch (element.tagName.toLowerCase()) {
            case 'p':
                schema = {
                    type: 'paragraph',
                    text: element.textContent.trim().replace(/\s+/g, ' ')
                };
                break;
            case 'img':
                schema = {
                    type: 'image',
                    src: getAbsoluteUrl(element.getAttribute('data-src') || element.getAttribute('src'), baseUrl),
                    alt: element.getAttribute('alt')
                };
                break;
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                schema = {
                    type: 'heading',
                    level: parseInt(element.tagName.charAt(1)),
                    text: element.textContent.trim().replace(/\s+/g, ' ')
                };
                break;
            case 'ul':
                schema = {
                    type: 'list',
                    items: []
                };
                element.querySelectorAll('li').forEach(li => {
                    schema.items.push({
                        type: 'listItem',
                        text: li.textContent.trim().replace(/\s+/g, ' ')
                    });
                });
                break;
            case 'div':
                if (element.className.includes('wp-block-image')) {
                    const img = element.querySelector('img');
                    if (img) {
                        schema = {
                            type: 'image',
                            src: getAbsoluteUrl(img.getAttribute('src'), baseUrl),
                            alt: img.getAttribute('alt')
                        };
                    }
                }
                break;
            default:
                // Ignore unknown elements
                break;
        }
        return schema;
    }
    
    function getAbsoluteUrl(url, baseUrl) {
        if (!url) return url;
        // Check if the URL is relative
        if (url.startsWith('/')) {
            return baseUrl + url;
        }
        // Return the URL if it's already absolute
        return url;
    }

    var myschedule;

    document.getElementById('dateForm').addEventListener('submit', function (event) {
        event.preventDefault();
        $('.timekeeper').remove()

        var startDate = document.getElementById('startDate').value;
        var endDate = document.getElementById('endDate').value;




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




        $('.status').append(myschedule+'<br>');
        $('#pullthecode3').append(myschedule)

    });

    $('.showmyfetch').on('click' , function() {
        openfetch = $(this).attr('openfetch')
        backimage = $(this).attr('backimage')
        $('.myfetcher').hide()
        $(openfetch).fadeIn()
        $('.showmyfetch').css('color' , '#fff').css('border-color' , '#fff').css('opacity' , '1')
        $(this).css('color' , 'yellow').css('border-color' , 'yellow').css('opacity' , '0.5');
        $('#fetchmyid .modal-content').attr('style', function() {
    // Clear any existing inline styles
    return ''; 
}).attr('style', function() {
    // Add new background image with !important
    return 'background-image: url(assets/fetch-black' + backimage + '.png) !important;';
});
    })

        document.addEventListener('DOMContentLoaded', () => {
            const dbName = 'ProjectVersionsDB';
            const storeName = 'versionsStore';
            let db;

            function initDB() {
                const request = indexedDB.open(dbName, 1);

                request.onupgradeneeded = (event) => {
                    db = event.target.result;
                    db.createObjectStore(storeName, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                };

                request.onsuccess = (event) => {
                    db = event.target.result;
                    loadVersions();
                };

                request.onerror = (event) => {
                    $('.status').append('Database error:', event.target.errorCode+'<br>');
                };
            }

            function saveVersion(versionName, content) {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const projectId = 1; // Example project id

                const version = {
                    projectId,
                    versionName,
                    content,
                    createdAt: new Date()
                };

                const request = store.add(version);

                request.onsuccess = () => {
                    $('#versionName').val('');
                    $('.modalmessaging').text("Version Saved Successfully");
                    $('.modalmessaging').delay(2000).queue(function (next) {
                        $(this).text('');
                        next();
                    });
                    loadVersions();
                };

                request.onerror = (event) => {
                    $('.status').append('Save version error:', event.target.errorCode+'<br>');
                };
            }

            function getVersions(projectId) {
                const transaction = db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);

                const request = store.getAll();

                request.onsuccess = (event) => {
                    const versions = event.target.result.filter(version => version.projectId === projectId);
                    displayVersions(versions);
                };

                request.onerror = (event) => {
                    $('.status').append('Get versions error:', event.target.errorCode+'<br>');
                };
            }

            function displayVersions(versions) {
                const versionsList = document.getElementById('versionsList');
                const versionSelect = document.getElementById('versionList');
                versionsList.innerHTML = ''; // Clear the list
                versionSelect.innerHTML = '<option disabled selected>Version List</option>'; // Clear the select

                versions.forEach(version => {
                    const li = document.createElement('li');
                    li.textContent =
                        `${version.versionName || 'Unnamed'}  :   ${new Date(version.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}`;
                    li.setAttribute('data-version-id', version.id);
                    li.setAttribute('data-info', `${version.versionName || 'Unnamed'}`);
                    // Add delete button
                    const deleteButton = document.createElement('span');
                    deleteButton.textContent = 'DELETE';
                    deleteButton.className = 'delete-btn';
                    deleteButton.onclick = () => deleteVersion(version.id);
                    li.appendChild(deleteButton);

                    // Add export button
                    const exportButton = document.createElement('span');
                    exportButton.textContent = 'EXPORT';
                    exportButton.className = 'export-btn';
                    
                    exportButton.onclick = () => exportVersion(version.id);
                    exportButton.setAttribute('datainfo', $(this).parent().text());
                    li.appendChild(exportButton);

                    versionsList.appendChild(li);

                    // Add to select dropdown
                    const option = document.createElement('option');
                    option.value = version.id;
                    option.text =
                        `${version.versionName || 'Unnamed'} - ${new Date(version.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}`;
                    versionSelect.add(option);
                });

                $('.export-btn').each(function() {
                    thisistheversion = $(this).parent('li').attr('data-version-id')
                    $(this).after('<div class="load-btn" data-version-id="'+thisistheversion+'" style="margin-right:10px;font-size: 0.8rem;">Load Version</div>');
                         
                })

                $('.load-btn').on('click' , function() {
                    myversionloadnum = $(this).attr('data-version-id')
                    $('#versionList option[value="' + myversionloadnum + '"]').prop('selected', true).trigger('change');
                   $('#uniqueModal').fadeOut()
                   $('#versionsModal').hide()
                   clearAppDatabaseGithub();  
                })
            }

            function deleteVersion(versionId) {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);

                const request = store.delete(versionId);

                request.onsuccess = () => {
                    $('.saveinfo').text("Version Deleted Successfully");
                    loadVersions();
                };

                request.onerror = (event) => {
                    $('.status').append('Delete version error:', event.target.errorCode+'<br>');
                };
            }

            function revertVersion(versionId) {
                const transaction = db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);

                const request = store.get(versionId);

                request.onsuccess = (event) => {
                    const version = event.target.result;
                    document.getElementById('pullthecode2').innerHTML = version.content;
                };

                request.onerror = (event) => {
                    $('.status').append('Revert version error:', event.target.errorCode+'<br>');
                };

                $('#beautycode').val($('#pullthecode3').html())
            }

            function exportVersion(versionId, Versionnameexport) {



                function getSelectedVersionHtml(callback) {
                    var dbName = "ProjectVersionsDB"; // Replace with your IndexedDB database name
                    var storeName = "versionsStore"; // Replace with your IndexedDB object store name
                    var selectedVersionKey = versionId // Replace with the key of the selected version
                    var request = indexedDB.open(dbName);

                    request.onerror = function (event) {
                        $('.status').append("IndexedDB error: ", event.target.errorCode+'<br>');
                      
                       $('.saveinfo').text('Error: Unable to access IndexedDB.')
                    };

                    request.onsuccess = function (event) {
                        var db = event.target.result;
                        var transaction = db.transaction([storeName], "readonly");
                        var objectStore = transaction.objectStore(storeName);
                        var getRequest = objectStore.get(selectedVersionKey);

                        getRequest.onerror = function (event) {
                            $('.status').append("Error retrieving data from IndexedDB: ", event.target
                                .errorCode+'<br>');
                      
                         $('.saveinfo').text('Error: Unable to retrieve data from IndexedDB.')
                        };

                        getRequest.onsuccess = function (event) {
                            if (getRequest.result) {
                                callback(getRequest.result
                                .content); // Assuming the HTML content is stored in the 'htmlContent' field
                            } else {
                                $('.status').append("No data found for the selected version."+'<br>');
                               
                               $('.saveinfo').text('Error: No content found for the selected version.')
                            }
                        };
                    };
                }

                // Function to download the HTML content as a file
                function downloadHtmlContent(content, versionId, ) {
                    var mynewname = 'Version' + versionId + 'List.txt'
                    var filename = mynewname;

                    // Create a Blob from the HTML content
                    var blob = new Blob([content], {
                        type: 'text/plain'
                    });

                    // Create a link element
                    var link = document.createElement('a');
                    link.className = 'outsidelink';

                    // Set the download attribute with the filename
                    link.download = filename;

                    // Create an object URL for the Blob
                    link.href = window.URL.createObjectURL(blob);

                    // Append the link to the body
                    document.body.appendChild(link);

                    // Programmatically click the link to trigger the download
                    link.click();

                    // Remove the link from the document
                    document.body.removeChild(link);
                }

                // Retrieve the selected version's HTML and download it
                getSelectedVersionHtml(function (htmlContent) {
                    downloadHtmlContent(htmlContent);
                });
            }





            document.getElementById('showVersionBtn2').addEventListener('click', () => {
                $('#versioningmodalshow').hide()
                getVersions(1); // Fetch versions for projectId 1
                document.getElementById('versionsModal').style.display = 'block';
            });



            document.getElementById('saveVersionBtn').addEventListener('click', () => {
                const versionName = document.getElementById('versionName').value;
                const content = document.getElementById('pullthecode2').innerHTML;
                saveVersion(versionName, content);
            });

            document.getElementById('revertVersionBtn').addEventListener('click', () => {
                const versionId = parseInt(document.getElementById('versionList').value);
                revertVersion(versionId);
            });

            document.getElementById('clearVersionsBtn').addEventListener('click', () => {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);

                const request = store.clear();

                request.onsuccess = () => {
                    $('.saveinfo').text("All Versions Cleared Successfully");
                    loadVersions();
                };

                request.onerror = (event) => {
                    $('.status').append('Clear versions error:', event.target.errorCode+'<br>');
                };
            });

            document.getElementById('showVersionsBtn').addEventListener('click', () => {
                getVersions(1); // Fetch versions for projectId 1
                document.getElementById('versionsModal').style.display = 'block';
            });

            // Close modal when the user clicks on <span> (x)
            document.querySelector('.modal .close').addEventListener('click', () => {
                
                document.getElementById('versionsModal').style.display = 'none';
                $('#uniqueModal').fadeOut()
            });

            // Close modal when the user clicks anywhere outside of the modal
            window.onclick = (event) => {
              
                const modal = document.getElementById('versionsModal');
                if (event.target === modal) {
                    modal.style.display = 'none';
                    $('#uniqueModal').fadeOut()
                }
            };

            function loadVersions() {
                getVersions(1); // Example project id
            }

            initDB();
        });

    $(document).ready(function () {
        $('#colorPicker').on('input', function () {
            var selectedColor = $(this).val();
            $('#colorDisplay').css('background-color', selectedColor);
        });
    });

    $(document).ready(function () {
        function showModal() {
            $('#uniqueModal').show();
            if (parent && parent.document) {
        // Hide the element with id 'headerstart' in the parent document
        var headerElement = parent.document.getElementById('headerstart');
        if (headerElement) {
            headerElement.style.display = 'none';
        }
    }
        }

        function hideModal() {
            $('#uniqueModal').hide();
            $('#googleDocImporterModal').hide()
            if (parent && parent.document) {
        // Hide the element with id 'headerstart' in the parent document
        var headerElement = parent.document.getElementById('headerstart');
        if (headerElement) {
            headerElement.style.display = 'block';
        }
    }
        }

        window.addEventListener('message', function (event) {
            $('.status').append('Message received in embedded content:', event.data+'<br>');
            if (event.data.action === 'showModal') {
                $('.status').append('Received showModal message'+'<br>');
                showModal();
            }
        });

        $('.close-modal').on('click', hideModal);

        $(window).on('click', function (event) {
            if ($(event.target).is('#uniqueModal')) {
                hideModal();
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        const phrases = [
            "A journey of a thousand miles begins with a single step.",
            "Rome wasn't built in a day.",
            "The journey is the reward.",
            "The person who moves a mountain begins by carrying away small stones.",
            "Little by little, one travels far.",
            "Great things are not done by impulse, but by a series of small things brought together.",
            "Success is the sum of small efforts, repeated day in and day out.",
            "A little progress each day adds up to big results.",
            "The secret of getting ahead is getting started.",
            "Step by step and the thing is done.",
            "Small deeds done are better than great deeds planned.",
            "Big journeys begin with small steps.",
            "The smallest deed is better than the greatest intention.",
            "By the yard, tasks are hard; but inch by inch, anything's a cinch.",
            "One step at a time.",
            "Little drops of water make a mighty ocean.",
            "The distance is nothing; it is only the first step that is difficult.",
            "Small steps lead to big changes.",
            "Every accomplishment starts with the decision to try.",
            "The only impossible journey is the one you never begin.",
            "A single sunbeam is enough to drive away many shadows.",
            "Small steps every day.",
            "Slow and steady wins the race.",
            "One step at a time.",
            "The journey of a thousand miles begins with one step.",
            "Tiny steps will take you to the finish line.",
            "The way to get started is to quit talking and begin doing.",
            "Success is a series of small wins.",
            "The difference between ordinary and extraordinary is that little extra."
        ];

        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        document.getElementById('inspire').innerText = randomPhrase;
    });

$('#loadstartmenu').on('click' , function() {
    $("#uniqueModal").show("fold", {horizFirst: true}, 1000);
    $('.unique-box').show()
    if (parent && parent.document) {
        // Hide the element with id 'headerstart' in the parent document
        var headerElement = parent.document.getElementById('headerstart');
        var tabElementstart = parent.document.getElementById('add-tab');
        if (headerElement) {
            headerElement.style.display = 'none';
            tabElementstart.style.display = 'none'
        }
    }
})


    $('#openNotebookWindow').on('click', function() {
        // Open a new window with the specified URL and dimensions
        window.open('notebook-window.html', 'NotebookWindow', 'width=1250,height=768');

    });

    
    $('#openEffectusWindow , .effectuslink').on('click', function() {
        window.open('https://pcr.effectuspartners.com/login', 'Effectus PIM', 'width=1024,height=768');
    });
    $('#openSalesforceWindow , .salesforcelink').on('click', function() {
        window.open('https://staging-na01-pcrichard.demandware.net/on/demandware.store/Sites-Site/default/ViewApplication-DisplayWelcomePage', 'Salesforce Staging', 'width=1024,height=768');
    });

    $('#finalcodeNotebook').on('click' , function() {
       $('#openNotebookWindow').click() 
    })

    $('#topofpagecontent').on('click', function() {
        var $element = $('.explorerselected');
        
        if ($element.hasClass('topofpagecontent')) {
            $element.css('padding-left', '').removeClass('topofpagecontent');
        } else {
            $element.css('padding-left', '17px').addClass('topofpagecontent');
        }
    });




//--- Google Doc Importer

function replaceSmartQuotes(docHtml) {
    return docHtml.replace(/’/g, "'");
}


function processHeaders(docHtml) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = docHtml;

    // Process h2 elements
    const h2Elements = tempDiv.querySelectorAll('h2');
    h2Elements.forEach(h2 => {
        h2.removeAttribute('id'); // Remove ID attribute
        h2.classList.add('t-h4-style', 'c-blue'); // Add classes
        h2.setAttribute('style', 'color:#034694 !important'); // Add inline style
    });

    // Process h3 elements
    const h3Elements = tempDiv.querySelectorAll('h3');
    h3Elements.forEach(h3 => {
        h3.removeAttribute('id'); // Remove ID attribute
        h3.classList.add('t-h6-style', 'c-blue'); // Add classes
        h3.setAttribute('style', 'color:#034694 !important'); // Add inline style
    });

    return tempDiv.innerHTML;
}


    function addClassesToHeaders(docHtml) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = docHtml;
    
        // Add classes to h2 elements
        const h2Elements = tempDiv.querySelectorAll('h2');
        h2Elements.forEach(h2 => {
            h2.classList.add('t-h4-style', 'c-blue' , 'in910');
        });
    
        // Add classes to h3 elements
        const h3Elements = tempDiv.querySelectorAll('h3');
        h3Elements.forEach(h3 => {
            h3.classList.add('t-h6-style', 'c-blue' , 'in910');
        });
    
        return tempDiv.innerHTML;
    }



    function cleanGoogleDocUrls(docHtml) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = docHtml;
    
        // Select all anchor tags with href attributes
        const links = tempDiv.querySelectorAll('a[href]');
        
        links.forEach(link => {
            let href = link.getAttribute('href');
            const prefix = 'https://www.google.com/url?q=https://www.pcrichard.com';
            
            if (href.startsWith(prefix)) {
                // Remove the prefix and everything after '&' if it exists
                href = href.slice(prefix.length).split('&')[0];
                link.setAttribute('href', href);
            }
        });
    
        return tempDiv.innerHTML;
    }



    async function fetchGoogleDocContent(docUrl) {
        try {
            const exportUrl = docUrl.replace('/edit', '/export?format=html');
            const response = await fetch(exportUrl);
            if (!response.ok) throw new Error('Failed to fetch the Google Doc content.');
            const docHtml = await response.text();
    
            return docHtml;
        } catch (error) {
            $('.status').append('Error fetching Google Doc content:', error+'<br>');
            return null;
        }
    }

    document.getElementById('import-google-doc').addEventListener('click', async function() {
        const googleDocUrl = document.getElementById('google-doc-url-input').value;
        const content = await fetchGoogleDocContent(googleDocUrl);
        if (content) {
            // Clean up the Google-specific URLs
            let cleanedContent = cleanGoogleDocUrls(content);
            
            // Replace smart quotes
            cleanedContent = replaceSmartQuotes(cleanedContent);
            
            // Process headers to add classes, remove IDs, and set inline styles
            cleanedContent = processHeaders(cleanedContent);
            
            const docParser = new DOMParser();
            const doc = docParser.parseFromString(cleanedContent, 'text/html');
    
            // Append the cleaned and styled content to your DOM element
            document.getElementById('pullthecode3').innerHTML += doc.body.innerHTML;
    
            // Update your preview, if necessary
            debouncedUpdateMobilePreview();
            $('#googleDocImporterModal').hide()
            $('#uniqueModal').hide()
            clearAppDatabaseGithub();
        } else {
            $('.status').append('Failed to Fetch Google Doc'+'<br>')
            $('.saveinfo').text('Failed to Fetch Google Doc')
        }
    });


    document.getElementById('import-google-doc2').addEventListener('click', async function() {
        const googleDocUrl = document.getElementById('google-doc-url-input2').value;
        const content = await fetchGoogleDocContent(googleDocUrl);
        if (content) {
            // Clean up the Google-specific URLs
            let cleanedContent = cleanGoogleDocUrls(content);
            
            // Replace smart quotes
            cleanedContent = replaceSmartQuotes(cleanedContent);
            
            // Process headers to add classes, remove IDs, and set inline styles
            cleanedContent = processHeaders(cleanedContent);
            
            const docParser = new DOMParser();
            const doc = docParser.parseFromString(cleanedContent, 'text/html');
    
            // Append the cleaned and styled content to your DOM element
            document.getElementById('pullthecode3').innerHTML += doc.body.innerHTML;
    
            // Update your preview, if necessary
            debouncedUpdateMobilePreview();
            $('#googleDocImporterModal').hide()
            $('#uniqueModal').hide()
        } else {
            $('.status').append('Failed to Fetch Google Doc'+'<br>')
        }
    });




    $('.close-modalgoogle').on('click' , function() {
        $('#googleDocImporterModal').hide()
        $('#googleDocImporterModal3').hide()
        $('.unique-box ').show()
    })



    $('#import-google-doc3').on('click', function() {
        document.querySelector('button[mymatrix="mymatrix3"]').click();
        const googleDocUrl = document.getElementById('google-doc-url-input3').value;
        
        // Extract the file ID from the Google Drive URL
        const fileIdMatch = googleDocUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (!fileIdMatch) {
            $('.status').append('Invalid Google Drive URL.'+'<br>');
            return;
        }
        const fileId = fileIdMatch[1];
        
        // Construct the Google Drive view link
        const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
    
        // Open the Google Drive link in a new browser tab
        window.open(viewUrl, '_blank');
    });

    $('#minicoder').on('click', function() {
        if ($('#minicoder').text() === '-') {
            $('.minicoder').hide()
            $('#minicoder').text('+').css('color' , 'yellow');
        } else {
            $('.minicoder').show()
            $('#minicoder').text('-').css('color' , '#fff');
        }
    });

    //-------------------------------------------------------------------------------------------------------------

   $('#closenewFileModal').on('click' , function() {
    $('#newFileModal').hide()
    $('.unique-modal').hide()
   })
    
   $('.terminalbutton').on('click', function() {$('.terminal').slideToggle();});

   $('.statusbutton').on('click', function() {
    $('.status2').slideToggle();
   });

$('.topmenu3').on('click', function () {
    $('.topmenu3').removeClass('active')
    $(this).addClass('active')

})

$('#RefreshMobile').on('click' , function() {
   $('#mobilepreview2').html($('#pullthecode3').html()) 
})






document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.showalttitle');
    const popup = document.createElement('div');
    popup.classList.add('alt-popup');
    document.body.appendChild(popup);

    images.forEach(image => {
        image.addEventListener('mouseenter', function(event) {
            const altText = event.target.alt;
            if (altText) {
                popup.textContent = altText;
                popup.style.display = 'block';
                const rect = event.target.getBoundingClientRect();
                popup.style.left = rect.left + window.scrollX + 'px';
                popup.style.top = rect.bottom + window.scrollY + 'px';
            }
        });

        image.addEventListener('mouseleave', function() {
            popup.style.display = 'none';
        });

        image.addEventListener('mousemove', function(event) {
            popup.style.left = event.pageX + 'px';
            popup.style.top = event.pageY + 'px';
        });
    });
});







    
    
    
    
    
    
    
    
    

    
    