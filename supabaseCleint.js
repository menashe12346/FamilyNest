import { createClient } from '@supabase/supabase-js';




// Replace these with your Supabase project URL and anon key
const SUPABASE_URL = 'https://uobdeuywixmstdrxugmh.supabase.co';  // Your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvYmRldXl3aXhtc3Rkcnh1Z21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjM2MDYsImV4cCI6MjA1MjU5OTYwNn0.6VyDsvdGcMk-45tUllEZL_g4atOkmMpixR3G-0SXOQM'

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const uploadImage = async (filePath, fileName) => {
  console.log('Uploading...');
  try {
    const fileExtension = '.jpeg'; // Adjust this based on your file type
    const fullFileName = fileName.endsWith(fileExtension) ? fileName : `${fileName}${fileExtension}`;
    
    const file = {
      uri: filePath,
      type: 'image/jpeg', // Correct MIME type
      name: fullFileName,
    };

    console.log('File to upload:', file);

    const { data, error } = await supabase.storage
      .from('ProfilePictures') // Specify bucket name
      .upload(fullFileName, file);

    if (error) throw error;

    console.log('File uploaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
};

// Example: Fetch a file from the "Pictures" bucket
export const getImageUrl = (fileName) => {
  const url = `${SUPABASE_URL}/storage/v1/object/public/pictures/${fileName}`;
  console.log('File URL:', url);
  return url;
};

export default supabase;
