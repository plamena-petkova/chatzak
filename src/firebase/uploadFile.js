import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";


const uploadFile = async (file, onProgress) => {

    const storageRef = ref(storage, `images/${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    
    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if (onProgress) {
                onProgress(progress);
            }
            }, 
            (error) => {
             reject('Something went wrong' + error)
            }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );

    })

}

export default uploadFile;