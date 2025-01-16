import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and anon key
const SUPABASE_URL = 'https://uobdeuywixmstdrxugmh.supabase.co';  // Your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvYmRldXl3aXhtc3Rkcnh1Z21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjM2MDYsImV4cCI6MjA1MjU5OTYwNn0.6VyDsvdGcMk-45tUllEZL_g4atOkmMpixR3G-0SXOQM';  // Your Supabase anon key

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Example: Upload a file to the "Pictures" bucket
const uploadImage = async (uri) => {
  const file = {
    uri: uri,
    type: 'image/jpeg', // Adjust type based on the file
    name: 'myImage.jpg', // You can generate a unique name if needed
  };

  const { data, error } = await supabase.storage
    .from('pictures') // Your bucket name
    .upload('myImage.jpg', file, { upsert: false });

  if (error) {
    console.error('Error uploading image:', error);
  } else {
    console.log('File uploaded successfully:', data);
  }
};

// Example: Fetch a file from the "Pictures" bucket
const getImageUrl = (fileName) => {
  const url = `${SUPABASE_URL}/storage/v1/object/public/pictures/${fileName}`;
  console.log('File URL:', url);
  return url;
};

export default supabase;
