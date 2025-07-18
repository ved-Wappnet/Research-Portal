import { connectToDatabase } from '@/lib/mongodb';
import User, { ROLE } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing email or password.' }), { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 401 });
    }

    // Don't return password
    const userObj = user.toObject();
    delete userObj.password;

    return new Response(JSON.stringify({ user: userObj }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Login failed.' }), { status: 500 });
  }
}
