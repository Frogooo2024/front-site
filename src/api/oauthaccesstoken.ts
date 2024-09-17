import { Request, Response } from 'express';
import axios from 'axios';

// Your Google client ID and secret
const clientId = process.env.GOOGLE_CLIENT_ID || '425446394310-9rlf49t3o4r8odam96q5itlhqvu4kef2.apps.googleusercontent.com';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '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';
const redirectUri = `${process.env.CLIENT_URL}/oauth/callback`;

export async function exchangeAuthCodeForToken(req: Request, res: Response) {
  const { code } = req.body;

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.data.access_token) {
      res.json({
        success: true,
        code: 200,
        data: {
          accessToken: response.data.access_token
        }
      });
    } else {
      res.status(400).json({
        success: false,
        code: 400,
        message: 'Failed to obtain access token'
      });
    }
  } catch (error) {
    console.error('Error exchanging auth code for token:', error);
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Internal Server Error'
    });
  }
}
