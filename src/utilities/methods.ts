import imageCompression from 'browser-image-compression'

const fileCompress=async (file)=>{
    const config={ size: 100, type: "image/jpeg",  maxSizeMB: 0.095, maxWidthOrHeight: 512, fileType: 'image/jpeg' }
    
   const res = await imageCompression(file, config)
   return res
}


const getBase64 = (file: File):Promise<any>=> {
    return new Promise((resolve)=> {
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>resolve(reader.result)
    })
}
  export { fileCompress, getBase64 }
