import { readFile } from 'node:fs/promises';

// Part 1: The User type is already defined, but you need to define the Post type.
import { type Post } from './types/Post.js';
import { type User } from './types/User.js';

// both files are read and parsed, and their results stored in variables:
const posts: Post[] = JSON.parse(await readFile('data/posts.json', 'utf8'));
const users: User[] = JSON.parse(await readFile('data/users.json', 'utf8'));

// Part 2: write your logic for printing the names of the users and the titles
// of their own posts
