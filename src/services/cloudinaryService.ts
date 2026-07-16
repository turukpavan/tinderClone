export const uploadImageFromUrl = async (uri : string) => {
  const data = new FormData();

data.append('file', {
    uri,
    type: 'image/jpeg',
    name: 'profile.jpg',
  });  data.append('upload_preset', 'tinder_clone');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dp64jxn0h/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const result = await response.json();

    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};