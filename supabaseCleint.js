import { createClient } from '@supabase/supabase-js';




// Replace these with your Supabase project URL and anon key
const SUPABASE_URL = 'https://uobdeuywixmstdrxugmh.supabase.co';  // Your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvYmRldXl3aXhtc3Rkcnh1Z21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjM2MDYsImV4cCI6MjA1MjU5OTYwNn0.6VyDsvdGcMk-45tUllEZL_g4atOkmMpixR3G-0SXOQM'

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Example: Upload a file to the "Pictures" bucket
export const uploadImage = async (filePath, fileName) => {
  console.log('Uploading...')
  try {
    const file = {
      uri: filePath,
      type: 'jpeg', // Adjust based on file type
      name: fileName,
    };

    console.log('filke',file)

    const { data, error } = await supabase.storage
      .from('ProfilePictures') // Specify bucket name
      .upload(fileName, file);

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
