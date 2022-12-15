import React, {useContext, useState} from "react";
import {Button, Card, Input, List, message} from "antd";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {firebaseContext} from "../../contexts/firebaseContext";
import styles from "./styles.scss";
import {signOut} from "firebase/auth";
import useRequireAuth from "../../hooks/useRequireAuth";

const Admin = () => {
  useRequireAuth("/login");
  const {auth, storage} = useContext(firebaseContext);

  const [imageUrls, setImageUrls] = useState([]);
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState('');

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      message.error('File size to large');
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`); // for upload data
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setDownloadURL(url)
            })
        },
      );
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  return (
    <div className={styles.container}>
      <div>
        <Input
          type="file"
          placeholder="Select file to upload"
          accept="image/*"
          // accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className={styles.wrap}>
          <Card>
            {imageFile && (
              <>
                <List.Item
                  extra={[
                    <Button
                      ghost={true}
                      key="btnRemoveFile"
                      onClick={handleRemoveFile}
                      type="text"
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={imageFile.name}
                    description={`Size: ${imageFile.size}`}
                  />
                </List.Item>

                <div className="text-right mt-3">
                  <Button
                    type="primary"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </Button>

                </div>
              </>
            )}
          </Card>
          <div>
            <Button
              onClick={() => {
                signOut(auth);
              }}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;