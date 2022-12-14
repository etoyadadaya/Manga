import React, {FC, useContext, useEffect, useState} from "react";
import styles from "./styles.scss";
import useRequireAuth from "../../hooks/useRequireAuth";
import {signOut} from "firebase/auth";
import {firebaseContext} from "../../contexts/firebaseContext";
import {ref, uploadBytesResumable, getDownloadURL, listAll} from "firebase/storage"
import {Button, Card, Input, List, Image, Progress, message, Carousel, Slider} from "antd";

const Main: FC = () => {
  useRequireAuth("/login");
  const {auth, storage} = useContext(firebaseContext);

  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [links, setLinks] = useState<string[] | null>([]);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      message.error('File size to large');
    }
  }

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;

      //TODO сделать хук, который при вызове принимает параметр пути куда сейвить дату,
      // и через ввод указывать пут.
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          message.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
            //url is download url of file
            setDownloadURL(url)
          })
        },
      )
    } else {
      message.error('File not found')
    }
  }

  const handleRemoveFile = () => setImageFile(undefined);

  const listRef = ref(storage, 'berserk/1/');

  useEffect(() => {
    const fetchImages = async () => {

      let result = await listAll(listRef);
      let urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));

      return Promise.all(urlPromises);
    }

    const loadImages = async () => {
      const urls = await fetchImages();
      setLinks(urls);
    }

    loadImages();
  }, []);

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

          <div>
            <Card>
              {imageFile && (
                <>
                  <List.Item
                    extra={[
                      <Button
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
                      loading={isUploading}
                      type="primary"
                      onClick={handleUploadFile}
                    >
                      Upload
                    </Button>

                    <Progress percent={progressUpload} />
                  </div>
                </>
              )}
            </Card>
        </div>
          <div className={styles.cards}>
            <Carousel swipe={true} adaptiveHeight={true}>
                {links.map((link, key) =>
                  <Image preview={false} src={link} alt="" key={key}/>
                )}
            </Carousel>
          </div>
        </div>
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
    </>
  );
};

export default Main;
