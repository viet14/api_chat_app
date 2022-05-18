import {v4 as uuidv4} from 'uuid'
import firebaseAdmin from "firebase-admin"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('./chat-2ff3c-firebase-adminsdk-8wvbw-93d8bb272f.json')


const admin = firebaseAdmin.initializeApp({
    credential : firebaseAdmin.credential.cert(config)
})

const storageRef = admin.storage().bucket(`gs://chat-2ff3c.appspot.com`) 

const upload = async(path,fileName)=>{
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/uploads/hashnode/${fileName}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    })
    return storage[0].metadata.mediaLink
}

export {upload}