
import FormData from 'form-data'
import {Blob} from 'buffer';
import fetch from "node-fetch";

import {
    NETWORKS,
    getIpfsEndpoints
} from "../endpoints";

export default class IPFS {

    private readonly network: NETWORKS;

    public constructor(
        network: NETWORKS,
    ) {
        this.network = network;
    }

    private getMetadata(name:string, description:string) {
        return {
            "name": name,
            "description": description,
            "image": ""
        }
    }
    
    public async upload(form: any, nft: boolean){
        const result = await fetch(`${getIpfsEndpoints(this.network)}${nft ? 'upload' : 'upload-image'}`, {
            method: 'POST',
            body: form
        })
        return await result.json()
    }

    // for node js
    public async uploadNFTBufferToIPFS(buffer:Buffer, fileName:string, name:string, description:string) {
        if (Buffer.byteLength(buffer) > 100000000) throw new Error('File size should not exceed 100 MB.');
        const form: any = new FormData();
        const metadata = this.getMetadata(name, description)

        form.append('uploading_files', buffer, { filename: fileName });
        form.append('uploading_files', JSON.stringify(metadata), { filename: "metadata.json" });

        return await this.upload(form, true)
    }

    // for browser
    public getBlobMetadata(name:string, description:string): Blob {
        const metadata = this.getMetadata(name, description)
        return new Blob([JSON.stringify(metadata, null, 0)], { type: "application/json" });
    }

    public async uploadTokenBufferToIPFS(buffer: Buffer, fileName: string): Promise<{ image: string }> {
        if (Buffer.byteLength(buffer) > 100000000) throw new Error('File size should not exceed 100 MB.');
        
        const form = new FormData();

        form.append('uploading_files', buffer, { filename: fileName });

        return await this.upload(form, false)
    }

    public getUrlFromCid(cid:string) {
        return `${getIpfsEndpoints(this.network)}ipfs/${cid}`
    }
    
}
