import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//const MyEditor = ({ handleChange, value,  ...props }) => {
const uploadAdapter = (loader) => {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        //const body = new FormData();
        //let imagePromise: Promise<any> = new Promise((resolve, reject) => {
        return loader.file.then( file => new Promise( ( resolve, reject ) => {
          //body.append("files", file);
          //console.log(body);
          var myReader: FileReader = new FileReader();
          myReader.onloadend = (e) => {
            let image = myReader.result;
            return resolve({default: "data:image/png;base64," + image });
          }
          myReader.readAsDataURL(file);
        }))
      })
    }
  }
}
export default uploadAdapter;