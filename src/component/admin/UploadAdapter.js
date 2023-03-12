import React from "react";

const UploadAdapter = ({ loader }) => {
  console.log(loader);
  function upload() {
    console.log('Start Upload');
    //"data:image/png;base64,"+ btoa(binaryString) 
    return this.readThis(loader.file);
  }
  function readThis(File){
    console.log(File);
    let imagePromise: Promise<any> = new Promise((resolve, reject) => {
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        let image = myReader.result;
        console.log(image);
        return { default: "data:image/png;base64," + image };
        resolve();
      }
      myReader.readAsDataURL(File);
    });
    return imagePromise;
  }
}
export default UploadAdapter;