import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear the HTTP-only cookie
    cookies().delete('token');
    
    return Response.json(
      { success: true, message: 'Successfully logged out' },
      { 
        status: 200,
        headers: {
          'Set-Cookie': 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict',
        },
      }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
