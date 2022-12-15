// import {getDownloadURL, StorageReference, uploadBytesResumable} from "firebase/storage";
// import React from "react";
//
// const handleUploadFile = (imageFile: File, storageRef: StorageReference, setDownloadURL: React.Dispatch<React.SetStateAction<string>>) => {
//
//   if (imageFile) {
//     const uploadTask = uploadBytesResumable(storageRef, imageFile);
//
//     uploadTask.on(
//       'state_changed',
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref)
//           .then((url) => {
//             //url is download url of file
//             setDownloadURL(url)
//           })
//       },
//     );
//   }
// };