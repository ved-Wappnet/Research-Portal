import { getToken } from '@/lib/jwt';
import db from '@/lib/database';
import { cookies } from 'next/headers';

export async function GET(req) {
  try {
    // Get token from cookies
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return Response.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = getToken(token);
    if (!decoded) {
      return Response.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await db.User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] } // Exclude password from the result
    });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      user: user.get({ plain: true })
    });

  } catch (error) {
    console.error('Error in /api/me:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return Response.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
