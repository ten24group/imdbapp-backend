import { APIController, Authorizer, Controller, Environment, Get, ILogger, Post, Request, Response, createLogger, deleteFile, sendMail, sendQueueMessage, sendTopicMessage, uploadFile } from '@ten24group/fw24';

import { promises as fsPromises } from 'fs';


@Controller('test', { 
  authorizer: 'NONE',
  resourceAccess: {
    buckets: [ 'mybucket','mybucket1'],
    queues: [ { name: 'myqueue', access: ['send'] },],
    topics: [ { name: 'mytopic', access: ['publish'] },],
  },
  functionTimeout: 30
})
export class Test extends APIController{
  	readonly logger: ILogger = createLogger('Test');

    async initialize() {
        // register DI factories
        return Promise.resolve();
    }
    
    // Simple string response
    @Get('/print')
    print(req: Request, res: Response){
      return res.send('Hello World!');
    }

    // test file upload to s3
    @Post('/fileupload')
    async fileUpload(req: Request, res: Response){
      const { bucketName, fileName, contents } = req.body as {bucketName: string; fileName: string; contents: string} || {bucketName: 'upload', fileName: 'output-file.txt', contents: 'Hello World!'};
      const filePath = `/tmp/${fileName}`;

      await fsPromises.writeFile(filePath, contents);
      const fileContents = await fsPromises.readFile(filePath);

      const fullBucketName = Environment.bucketName(bucketName);
      this.logger.debug(fileName, fileContents, fullBucketName);

      await uploadFile(fileName, fileContents, fullBucketName);
      this.logger.debug('file uploaded successfully');

      return res.send('file uploaded successfully');
    }

    // test file upload to s3
    @Post('/filedelete')
    async fileDelete(req: Request, res: Response){
      const { bucketName, fileName } = req.body as {bucketName: string; fileName: string;} || {bucketName: 'upload', fileName: 'output-file.txt'};
      const filePath = `/tmp/${fileName}`;

      const fullBucketName = Environment.bucketName(bucketName);
      await deleteFile(fileName, fullBucketName);
      this.logger.debug('file deleted successfully');

      return res.send('file deleted successfully');
    }

    @Post('/queue')
    async addToQueue(req: Request, res: Response) {
      const { queueName, message } = req.body as {queueName: string; message: string;} || {queueName: 'myqueue', message: 'Hello from queue1'};

      const queueUrl = Environment.queueUrl(queueName);
      const sendResult = await sendQueueMessage(queueUrl, message);
      this.logger.debug('sendResult', sendResult);
  
      return res.send('Message sent to queue');
    }

    @Post('/mail')
    async testMail(req: Request, res: Response) {
      const {ToEmailAddress, Subject, Message} = req.body as {ToEmailAddress: string; Subject: string; Message: string;};

      const emailMessage = {
        "Subject": Subject,
        "Message": Message,
        "ToEmailAddress": ToEmailAddress,
        "FromEmailAddress": "s@ten24.co"
        }
      const sendResult = await sendMail(emailMessage);
      this.logger.debug('sendResult', sendResult);
  
      return res.send('Mail sent');
    }

    @Post('/mailTemplate')
    async testMailTemplate(req: Request, res: Response) {
      const {ToEmailAddress, TemplateName, TemplateData} = req.body as {ToEmailAddress: string; TemplateName: string; TemplateData: any;};

      const emailMessage = {
        "TemplateName": TemplateName,
        "ToEmailAddress": ToEmailAddress,
        "FromEmailAddress": "s@ten24.co"
      }

      const sendResult = await sendMail(emailMessage, TemplateData);
      this.logger.debug('sendResult', sendResult);
  
      return res.send('Mail sent using template');
    }

    @Post('/sns')
    async publishToSNS(req: Request, res: Response) {
      const { topicName, message } = req.body as {topicName: string; message: string;} || {topicName: 'mytopic', message: 'Hello from SNS'};

      const topicArn = Environment.topicArn(topicName);
      const snsResult = await sendTopicMessage(topicArn, message);
      this.logger.debug('snsResult', snsResult);
  
      return res.send('Message sent to SNS');
    }

    @Authorizer('AWS_IAM')
    @Get('/secureIAM')
    async secureIAM(req: Request, res: Response) {
      return res.send('Hello World! Secure IAM');
    }

    @Authorizer({type: 'AWS_IAM', groups: ['admin']})
    @Get('/secureIAMAdmin')
    async secureIAMAdmin(req: Request, res: Response) {
      return res.send('Hello World! Secure IAM Admin');
    }

    @Authorizer({type: 'AWS_IAM', groups: ['user']})
    @Get('/secureIAMUser')
    async secureIAMUser(req: Request, res: Response) {
      return res.send('Hello World! Secure IAM User');
    }

    // @Authorizer('COGNITO_USER_POOLS')
    // @Get('/secureUserPool')
    // async secureUserPool(req: Request, res: Response) {
    //   return res.send('Hello World! Secure User Pool');
    // }

}

export const handler = Test.CreateHandler(Test);
