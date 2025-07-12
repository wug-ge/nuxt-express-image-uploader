
import { Upload } from 'tus-js-client';

export function useTusUploader(endpoint: string) {
  function uploadFile(file: File, onProgress?: (percentage: number) => void, onSuccess?: (url: string) => void, onError?: (error: Error) => void) {
    const upload = new Upload(file, {
      endpoint,
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        filename: file.name,
        filetype: file.type
      },
      chunkSize: 5 * 1024 * 1024, // 5MB
      onError: (error) => {
        if (onError) onError(error);
      },
      onProgress: (bytesSent, bytesTotal) => {
        const percentage = Math.floor((bytesSent / bytesTotal) * 100);
        if (onProgress) onProgress(percentage);
      },
      onSuccess: () => {
        if (onSuccess && upload.url) onSuccess(upload.url);
      }
    });
    upload.start();
  }

  return { uploadFile };
}
