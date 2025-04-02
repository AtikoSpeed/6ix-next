import { cookies } from 'next/headers';

/**
 * Route handler to set Commerce Layer token in cookies
 * @param {Request} request - The request object
 * @returns {Response} - The response with cookie set
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { name, value, options } = data;
    
    if (!name || !value) {
      return Response.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
    }
    
    // Set the cookie using the cookies API
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      secure: process.env.NODE_ENV === 'production',
      ...options
    });
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error setting cookie:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
