import { Document as MongoDoc } from 'mongodb';
import { Profile } from 'common';

export type profileDoc = Profile & MongoDoc;
