import { S3Handler, S3Event } from 'aws-lambda';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';


export const handler: S3Handler = async (event: S3Event) => {
    console.log('Event: ', event);
    console.log('S3 event received: ', JSON.stringify(event.Records[0].s3))

    const s3Client = new S3Client();
    const command = new GetObjectCommand({
        Bucket: event.Records[0].s3.bucket.name,
        Key: event.Records[0].s3.object.key
    });
    const response = await s3Client.send(command);
    const str = await response?.Body?.transformToString();
    console.log('file content: ', str);
      
    return Promise.resolve();
}