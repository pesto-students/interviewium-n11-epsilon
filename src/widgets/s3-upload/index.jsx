import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import {s3} from '../../env/env'

const config = {
    bucketName: s3.S3_BUCKET,
    region: s3.REGION,
    accessKeyId: s3.ACCESS_KEY,
    secretAccessKey: s3.SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3  = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        handleUpload(e.target.files[0])
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(
                data =>{ console.log(data);
                props.setResumeLink(data.location)}
                )
            .catch(err => console.error(err))
    }

    return <div>
        <input type="file" onChange={handleFileInput}/>
        {/* // eslint-disable-next-line react/button-has-type */}
    </div>
}

export default UploadImageToS3WithReactS3;