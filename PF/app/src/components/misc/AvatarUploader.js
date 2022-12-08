import { Uploader } from 'rsuite';
import "rsuite/dist/rsuite.css";
import React from "react";


export default (props) => {
    return (
        <Uploader
            multiple={false}
            fileListVisible={false}
            listType="picture"
            action="//jsonplaceholder.typicode.com/posts/"
            onUpload={file => {
            }}
            onSuccess={(response, file) => {
            }}
            onError={() => {
            }}
            onChange={file => {
                props.setIsButtonDisabled(false);
            }}
            shouldUpload={file => {
                console.log(file);
                props.setFileInfo(file.blobFile);
                return false;
            }
            }
        >
            <button type='button' style={{ width: 150, height: 150 }}>
                <img src={props.previewFile} width="100%" height="100%" />

            </button>
        </Uploader>
    );
};