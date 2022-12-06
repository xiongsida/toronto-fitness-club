import { Uploader, Message, Loader, useToaster } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import "rsuite/dist/rsuite.css";
import React from "react";
import { CompareSharp } from '@mui/icons-material';

function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

export default (props) => {
    const toaster = useToaster();
    const [uploading, setUploading] = React.useState(false);
    const token = localStorage.getItem('access_token');
    const url = localStorage.getItem('user_url')

    return (
        <Uploader
            headers={{
                'Authorization': `Bearer ${token}`,
            }}
            fileListVisible={false}
            listType="picture"
            method={"PUT"}

            action={url}
            onUpload={file => {
                setUploading(true);
                previewFile(file.blobFile, value => {
                    props.setFileInfo(value);
                });
            }}
            onSuccess={(response, file) => {
                setUploading(false);
                toaster.push(<Message type="success">Uploaded successfully</Message>);
                console.log(response);
            }}
            onError={() => {
                props.setFileInfo(null);
                setUploading(false);
                toaster.push(<Message type="error">Upload failed</Message>);
            }}
        >
            <button type='button' style={{ width: 150, height: 150 }}>
                {uploading && <Loader backdrop center />}
                {props.fileInfo ? (
                    <img src={props.fileInfo} width="100%" height="100%" />
                ) : (
                    <AvatarIcon style={{ fontSize: 80 }} />
                )}
            </button>
        </Uploader>
    );
};