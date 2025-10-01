/**
 * Barrel export for all Keystone lists.
 * 
 * This allows `keystone.ts` to import `lists` in one line.
 * As we add more lists (Customer, Order, etc.), we just add them here.
 */
import { User } from './User';
import { Post } from './Post';
import { Tag } from './Tag';
import { ContactSubmission } from './ContactSubmission';
import { Subscriber } from './Subscriber';
import { KnowledgeBase } from './KnowledgeBase';
import { Category } from './Category';


export const lists = {
    User,
    Post,
    Tag,
    ContactSubmission,
    Subscriber,
    KnowledgeBase,
    Category
};