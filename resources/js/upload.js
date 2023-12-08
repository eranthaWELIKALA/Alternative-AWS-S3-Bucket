// Function to show/hide the modal
function toggleModal() {
    const modal = document.getElementById("uploadModal");
    modal.style.display =
        modal.style.display === "none" || modal.style.display === ""
            ? "flex"
            : "none";
}

function deleteFile(fileName) {
    // Set the file name in the hidden input field
    $("#fileNameToDelete").val(fileName);
    $("#deleteConfirmationModal").modal("show");
}

function copyToClipboard(fileName, fileUrl) {
    const tempInput = document.createElement("input");
    const textToCopy = `${window.location}${fileUrl}`;
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Optional: Show a notification or provide some visual feedback
    alert(`Copied: ${textToCopy}`);
}
