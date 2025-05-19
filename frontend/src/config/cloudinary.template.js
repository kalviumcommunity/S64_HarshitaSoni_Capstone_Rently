// Cloudinary configuration template
// Copy this file to cloudinary.js and replace the values with your actual credentials
const CLOUDINARY_CONFIG = {
  cloudName: 'your_cloud_name', // Replace with your cloud name from Cloudinary dashboard
  uploadPreset: 'rently_properties', // Your upload preset name
  apiKey: 'your_api_key', // Replace with your API key from Cloudinary dashboard
  apiSecret: 'your_api_secret', // Replace with your API secret from Cloudinary dashboard
  uploadUrl: 'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload' // Replace your_cloud_name with your actual cloud name
};

export default CLOUDINARY_CONFIG; 