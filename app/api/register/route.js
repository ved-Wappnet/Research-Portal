import { connectToDatabase } from '@/lib/mongodb';
import User, { ROLE } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password, role, institution } = await req.json();

    // Validate required fields
    if (!name || !email || !password || typeof role === 'undefined') {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
    }

    // Accept both string and number for role, convert string to number
    let normalizedRole = role
    if (typeof role === 'string') {
      const roleMap = { author: 0, reviewer: 1, editor: 2 }
      if (roleMap[role] === undefined) {
        return new Response(JSON.stringify({ error: 'Invalid role.' }), { status: 400 })
      }
      normalizedRole = roleMap[role]
    }
    // Validate normalized role
    const validRoles = [0, 1, 2]
    if (!validRoles.includes(normalizedRole)) {
      return new Response(JSON.stringify({ error: 'Invalid role.' }), { status: 400 })
    }

    await connectToDatabase();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered.' }), { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
      institution,
    });
    await user.save();

    // Don't return password
    const userObj = user.toObject();
    delete userObj.password;
    userObj.id = userObj._id; // Add 'id' as alias to '_id' for frontend convenience

    return new Response(JSON.stringify({ success: true, message: 'Registration successful!', user: userObj }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Registration failed.' }), { status: 500 });
  }
}
