import express from 'express';
import axios from 'axios';

const router = express.Router();

// Your Google client ID and secret
const googleTokenUrl = 'https://oauth2.googleapis.com/token';
const clientId = process.env.GOOGLE_CLIENT_ID || '425446394310-9rlf49t3o4r8odam96q5itlhqvu4kef2.apps.googleusercontent.com';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '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';
const redirectUri = `${process.env.CLIENT_URL}/oauth/callback`;

export const exchangeAuthCodeForToken = async (req, res) => {
  const { code } = req.body;
  try {
      const response = await axios.post(googleTokenUrl, {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      });
  
      res.json({
        success: true,
        code: response.status,
        data: response.data
      });
    } catch (error) {
      res.json({
        success: false,
        code: error.response?.status || 500,
        message: error.message
      });
    }
  };
  
  // Route configuration
  router.post('/api/googleOAuthCallback', exchangeAuthCodeForToken);

export default router;
