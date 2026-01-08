import { readFile } from 'node:fs/promises';

// Part 1: The User type is already defined, but you need to define the Post type.
import { type Post } from './types/Post.js';
import { type User } from './types/User.js';


// these variables specify the relative paths to the JSON files:
const usersFile = new URL('../data/users.json', import.meta.url);
const postsFile = new URL('../data/posts.json', import.meta.url);

// both files are read and parsed, and their results stored in variables:
const users: User[] = JSON.parse(await readFile(usersFile, 'utf8'));
const posts: Post[] = JSON.parse(await readFile(postsFile, 'utf8'));

// Part 2: write your logic for printing the names of the users and the titles 
// of their own posts
