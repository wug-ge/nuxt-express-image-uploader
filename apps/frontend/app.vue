<template>
  <div>
    Image Uploader:
    <input type="file" @change="handleFileUpload" />
  </div>
</template>

<script lang="ts" setup>
import { useTusUploader } from './composables/useTusUploader';

const TUS_ENDPOINT = '/api/files/'; // Change to your tus server endpoint
const { uploadFile } = useTusUploader(TUS_ENDPOINT);

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const uploadFileRes = uploadFile(file);
    console.log(uploadFileRes)
  }
}

</script>