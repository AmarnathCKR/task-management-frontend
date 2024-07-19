import React from "react";
import Swal from "sweetalert2";
import { Uploader, UploadButton } from "react-uploader";

// Initialize the uploader with your API key
const uploader = Uploader({ apiKey: "free" });

// Configuration options for the uploader
const options = { multi: true };

// Create a React component that triggers the SweetAlert2 modal
const MyComponent = () => {
  // Define a function that shows the modal with the title input and the UploadButton component
  const showModal = () => {
    MySwal.fire({
      title: "Upload files",
      html: (
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" />
          <UploadButton
            uploader={uploader}
            options={options}
            onComplete={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
          >
            {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
          </UploadButton>
        </div>
      ),
      preConfirm: () => {
        // Get the title value from the input element
        const title = document.getElementById("title").value;
        // Validate the title value
        if (!title) {
          Swal.showValidationMessage("Please enter a title");
        }
        // Return the title value
        return title;
      },
    }).then((result) => {
      // Do something with the title value
      console.log(result.value);
    });
  };

  // Return a button that calls the showModal function
  return <button onClick={showModal}>Show modal</button>;
};

export default MyComponent;