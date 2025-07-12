import express from 'express';
import { Server} from '@tus/server';
import { S3Store } from '@tus/s3-store';

const app = express();

const tusServer = new Server({
  path: "/files",
  datastore: new S3Store({
    s3ClientConfig: {
      endpoint: 'http://localhost:9000',
      region: 'default',
      forcePathStyle: true,
      bucket: 'images',
      credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD,
      }
    }
  }),
  generateUrl(req, options) {
    return `/api/files/${options.id}`
  },
});

app.all("/files", tusServer.handle.bind(tusServer));
app.all("/files/*splat", tusServer.handle.bind(tusServer));

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});