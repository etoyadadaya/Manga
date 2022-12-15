import React, {FC, useContext, useEffect, useState} from "react";
import styles from "./styles.scss";
import useRequireAuth from "../../hooks/useRequireAuth";
import {signOut} from "firebase/auth";
import {firebaseContext} from "../../contexts/firebaseContext";
import {ref, uploadBytesResumable, getDownloadURL, listAll} from "firebase/storage"
import {Button, Card, Input, List, Image, message, Carousel} from "antd";

const Main: FC = () => {
  useRequireAuth("/login");
  const {auth, storage} = useContext(firebaseContext);
  const imagesListRef = ref(storage, "berserk/1/"); // for retrieve data

  const [imageUrls, setImageUrls] = useState([]);
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState('');

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

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
      const storageRef = ref(storage, `berserk/2/${name}`); // for upload data
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              //url is download url of file
              setDownloadURL(url)
            })
        },
      );
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  return (
    <>
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
          <div className={styles.cards}>
            <Carousel  swipe={true} adaptiveHeight={true}>
                {imageUrls.map((link, key) =>
                  <Image preview={false} src={link} alt="" key={key}/>
                )}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
