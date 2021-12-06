import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='interviewium';
const REGION ='ap-south-1';
const ACCESS_KEY ='AKIATK5OHASDYW3IZXPC';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3  = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        {/* // eslint-disable-next-line react/button-has-type */}
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;