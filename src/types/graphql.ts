import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AuthenticatedItem = User;

export type ContactSubmission = {
  __typename?: 'ContactSubmission';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ContactSubmissionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ContactSubmissionOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  message?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ContactSubmissionUpdateArgs = {
  data: ContactSubmissionUpdateInput;
  where: ContactSubmissionWhereUniqueInput;
};

export type ContactSubmissionUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ContactSubmissionWhereInput = {
  AND?: InputMaybe<Array<ContactSubmissionWhereInput>>;
  NOT?: InputMaybe<Array<ContactSubmissionWhereInput>>;
  OR?: InputMaybe<Array<ContactSubmissionWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  message?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ContactSubmissionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSearchFields: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createContactSubmission?: Maybe<ContactSubmission>;
  createContactSubmissions?: Maybe<Array<Maybe<ContactSubmission>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createPost?: Maybe<Post>;
  createPosts?: Maybe<Array<Maybe<Post>>>;
  createTag?: Maybe<Tag>;
  createTags?: Maybe<Array<Maybe<Tag>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteContactSubmission?: Maybe<ContactSubmission>;
  deleteContactSubmissions?: Maybe<Array<Maybe<ContactSubmission>>>;
  deletePost?: Maybe<Post>;
  deletePosts?: Maybe<Array<Maybe<Post>>>;
  deleteTag?: Maybe<Tag>;
  deleteTags?: Maybe<Array<Maybe<Tag>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  /** Logs a message to the server console and returns a confirmation string. */
  logMessage?: Maybe<Scalars['String']['output']>;
  updateContactSubmission?: Maybe<ContactSubmission>;
  updateContactSubmissions?: Maybe<Array<Maybe<ContactSubmission>>>;
  updatePost?: Maybe<Post>;
  updatePosts?: Maybe<Array<Maybe<Post>>>;
  updateTag?: Maybe<Tag>;
  updateTags?: Maybe<Array<Maybe<Tag>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateContactSubmissionArgs = {
  data: ContactSubmissionCreateInput;
};


export type MutationCreateContactSubmissionsArgs = {
  data: Array<ContactSubmissionCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreatePostArgs = {
  data: PostCreateInput;
};


export type MutationCreatePostsArgs = {
  data: Array<PostCreateInput>;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateTagsArgs = {
  data: Array<TagCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteContactSubmissionArgs = {
  where: ContactSubmissionWhereUniqueInput;
};


export type MutationDeleteContactSubmissionsArgs = {
  where: Array<ContactSubmissionWhereUniqueInput>;
};


export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationDeletePostsArgs = {
  where: Array<PostWhereUniqueInput>;
};


export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteTagsArgs = {
  where: Array<TagWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationLogMessageArgs = {
  message: Scalars['String']['input'];
};


export type MutationUpdateContactSubmissionArgs = {
  data: ContactSubmissionUpdateInput;
  where: ContactSubmissionWhereUniqueInput;
};


export type MutationUpdateContactSubmissionsArgs = {
  data: Array<ContactSubmissionUpdateArgs>;
};


export type MutationUpdatePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};


export type MutationUpdatePostsArgs = {
  data: Array<PostUpdateArgs>;
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateTagsArgs = {
  data: Array<TagUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PostTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type PostTagsCountArgs = {
  where?: TagWhereInput;
};

export type PostCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<TagRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostManyRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  publishedAt?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type PostRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
};

export type PostRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
};

export type PostUpdateArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<TagRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  publishedAt?: InputMaybe<DateTimeNullableFilter>;
  slug?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringNullableFilter>;
  tags?: InputMaybe<TagManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  contactSubmission?: Maybe<ContactSubmission>;
  contactSubmissions?: Maybe<Array<ContactSubmission>>;
  contactSubmissionsCount?: Maybe<Scalars['Int']['output']>;
  /** Returns a static greeting message for testing the API connection. */
  helloWorld?: Maybe<Scalars['String']['output']>;
  keystone: KeystoneMeta;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryContactSubmissionArgs = {
  where: ContactSubmissionWhereUniqueInput;
};


export type QueryContactSubmissionsArgs = {
  cursor?: InputMaybe<ContactSubmissionWhereUniqueInput>;
  orderBy?: Array<ContactSubmissionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ContactSubmissionWhereInput;
};


export type QueryContactSubmissionsCountArgs = {
  where?: ContactSubmissionWhereInput;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostWhereInput;
};


export type QueryPostsCountArgs = {
  where?: PostWhereInput;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type QueryTagsCountArgs = {
  where?: TagWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TagPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostWhereInput;
};


export type TagPostsCountArgs = {
  where?: PostWhereInput;
};

export type TagCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<PostRelateToManyForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TagManyRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type TagRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
};

export type TagRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
};

export type TagUpdateArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<PostRelateToManyForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostManyRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
  role?: Maybe<UserRoleType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export enum UserRoleType {
  Admin = 'admin',
  User = 'user'
}

export type UserRoleTypeNullableFilter = {
  equals?: InputMaybe<UserRoleType>;
  in?: InputMaybe<Array<UserRoleType>>;
  not?: InputMaybe<UserRoleTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserRoleType>>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleType>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<UserRoleTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  AuthenticatedItem: ( User );
  UserAuthenticationWithPasswordResult:
    | ( UserAuthenticationWithPasswordFailure )
    | ( UserAuthenticationWithPasswordSuccess )
  ;
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticatedItem: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AuthenticatedItem']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ContactSubmission: ResolverTypeWrapper<ContactSubmission>;
  ContactSubmissionCreateInput: ContactSubmissionCreateInput;
  ContactSubmissionOrderByInput: ContactSubmissionOrderByInput;
  ContactSubmissionUpdateArgs: ContactSubmissionUpdateArgs;
  ContactSubmissionUpdateInput: ContactSubmissionUpdateInput;
  ContactSubmissionWhereInput: ContactSubmissionWhereInput;
  ContactSubmissionWhereUniqueInput: ContactSubmissionWhereUniqueInput;
  CreateInitialUserInput: CreateInitialUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeNullableFilter: DateTimeNullableFilter;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IDFilter: IdFilter;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  KeystoneAdminMeta: ResolverTypeWrapper<KeystoneAdminMeta>;
  KeystoneAdminUIFieldGroupMeta: ResolverTypeWrapper<KeystoneAdminUiFieldGroupMeta>;
  KeystoneAdminUIFieldMeta: ResolverTypeWrapper<KeystoneAdminUiFieldMeta>;
  KeystoneAdminUIFieldMetaCreateView: ResolverTypeWrapper<KeystoneAdminUiFieldMetaCreateView>;
  KeystoneAdminUIFieldMetaCreateViewFieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
  KeystoneAdminUIFieldMetaIsNonNull: KeystoneAdminUiFieldMetaIsNonNull;
  KeystoneAdminUIFieldMetaItemView: ResolverTypeWrapper<KeystoneAdminUiFieldMetaItemView>;
  KeystoneAdminUIFieldMetaItemViewFieldMode: KeystoneAdminUiFieldMetaItemViewFieldMode;
  KeystoneAdminUIFieldMetaItemViewFieldPosition: KeystoneAdminUiFieldMetaItemViewFieldPosition;
  KeystoneAdminUIFieldMetaListView: ResolverTypeWrapper<KeystoneAdminUiFieldMetaListView>;
  KeystoneAdminUIFieldMetaListViewFieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
  KeystoneAdminUIGraphQL: ResolverTypeWrapper<KeystoneAdminUiGraphQl>;
  KeystoneAdminUIGraphQLNames: ResolverTypeWrapper<KeystoneAdminUiGraphQlNames>;
  KeystoneAdminUIListMeta: ResolverTypeWrapper<KeystoneAdminUiListMeta>;
  KeystoneAdminUISort: ResolverTypeWrapper<KeystoneAdminUiSort>;
  KeystoneAdminUISortDirection: KeystoneAdminUiSortDirection;
  KeystoneMeta: ResolverTypeWrapper<KeystoneMeta>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  NestedStringFilter: NestedStringFilter;
  OrderDirection: OrderDirection;
  PasswordState: ResolverTypeWrapper<PasswordState>;
  Post: ResolverTypeWrapper<Post>;
  PostCreateInput: PostCreateInput;
  PostManyRelationFilter: PostManyRelationFilter;
  PostOrderByInput: PostOrderByInput;
  PostRelateToManyForCreateInput: PostRelateToManyForCreateInput;
  PostRelateToManyForUpdateInput: PostRelateToManyForUpdateInput;
  PostUpdateArgs: PostUpdateArgs;
  PostUpdateInput: PostUpdateInput;
  PostWhereInput: PostWhereInput;
  PostWhereUniqueInput: PostWhereUniqueInput;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  QueryMode: QueryMode;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
  Tag: ResolverTypeWrapper<Tag>;
  TagCreateInput: TagCreateInput;
  TagManyRelationFilter: TagManyRelationFilter;
  TagOrderByInput: TagOrderByInput;
  TagRelateToManyForCreateInput: TagRelateToManyForCreateInput;
  TagRelateToManyForUpdateInput: TagRelateToManyForUpdateInput;
  TagUpdateArgs: TagUpdateArgs;
  TagUpdateInput: TagUpdateInput;
  TagWhereInput: TagWhereInput;
  TagWhereUniqueInput: TagWhereUniqueInput;
  User: ResolverTypeWrapper<User>;
  UserAuthenticationWithPasswordFailure: ResolverTypeWrapper<UserAuthenticationWithPasswordFailure>;
  UserAuthenticationWithPasswordResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserAuthenticationWithPasswordResult']>;
  UserAuthenticationWithPasswordSuccess: ResolverTypeWrapper<UserAuthenticationWithPasswordSuccess>;
  UserCreateInput: UserCreateInput;
  UserOrderByInput: UserOrderByInput;
  UserRoleType: UserRoleType;
  UserRoleTypeNullableFilter: UserRoleTypeNullableFilter;
  UserUpdateArgs: UserUpdateArgs;
  UserUpdateInput: UserUpdateInput;
  UserWhereInput: UserWhereInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticatedItem: ResolversUnionTypes<ResolversParentTypes>['AuthenticatedItem'];
  Boolean: Scalars['Boolean']['output'];
  ContactSubmission: ContactSubmission;
  ContactSubmissionCreateInput: ContactSubmissionCreateInput;
  ContactSubmissionOrderByInput: ContactSubmissionOrderByInput;
  ContactSubmissionUpdateArgs: ContactSubmissionUpdateArgs;
  ContactSubmissionUpdateInput: ContactSubmissionUpdateInput;
  ContactSubmissionWhereInput: ContactSubmissionWhereInput;
  ContactSubmissionWhereUniqueInput: ContactSubmissionWhereUniqueInput;
  CreateInitialUserInput: CreateInitialUserInput;
  DateTime: Scalars['DateTime']['output'];
  DateTimeNullableFilter: DateTimeNullableFilter;
  ID: Scalars['ID']['output'];
  IDFilter: IdFilter;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  KeystoneAdminMeta: KeystoneAdminMeta;
  KeystoneAdminUIFieldGroupMeta: KeystoneAdminUiFieldGroupMeta;
  KeystoneAdminUIFieldMeta: KeystoneAdminUiFieldMeta;
  KeystoneAdminUIFieldMetaCreateView: KeystoneAdminUiFieldMetaCreateView;
  KeystoneAdminUIFieldMetaItemView: KeystoneAdminUiFieldMetaItemView;
  KeystoneAdminUIFieldMetaListView: KeystoneAdminUiFieldMetaListView;
  KeystoneAdminUIGraphQL: KeystoneAdminUiGraphQl;
  KeystoneAdminUIGraphQLNames: KeystoneAdminUiGraphQlNames;
  KeystoneAdminUIListMeta: KeystoneAdminUiListMeta;
  KeystoneAdminUISort: KeystoneAdminUiSort;
  KeystoneMeta: KeystoneMeta;
  Mutation: Record<PropertyKey, never>;
  NestedStringFilter: NestedStringFilter;
  PasswordState: PasswordState;
  Post: Post;
  PostCreateInput: PostCreateInput;
  PostManyRelationFilter: PostManyRelationFilter;
  PostOrderByInput: PostOrderByInput;
  PostRelateToManyForCreateInput: PostRelateToManyForCreateInput;
  PostRelateToManyForUpdateInput: PostRelateToManyForUpdateInput;
  PostUpdateArgs: PostUpdateArgs;
  PostUpdateInput: PostUpdateInput;
  PostWhereInput: PostWhereInput;
  PostWhereUniqueInput: PostWhereUniqueInput;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
  Tag: Tag;
  TagCreateInput: TagCreateInput;
  TagManyRelationFilter: TagManyRelationFilter;
  TagOrderByInput: TagOrderByInput;
  TagRelateToManyForCreateInput: TagRelateToManyForCreateInput;
  TagRelateToManyForUpdateInput: TagRelateToManyForUpdateInput;
  TagUpdateArgs: TagUpdateArgs;
  TagUpdateInput: TagUpdateInput;
  TagWhereInput: TagWhereInput;
  TagWhereUniqueInput: TagWhereUniqueInput;
  User: User;
  UserAuthenticationWithPasswordFailure: UserAuthenticationWithPasswordFailure;
  UserAuthenticationWithPasswordResult: ResolversUnionTypes<ResolversParentTypes>['UserAuthenticationWithPasswordResult'];
  UserAuthenticationWithPasswordSuccess: UserAuthenticationWithPasswordSuccess;
  UserCreateInput: UserCreateInput;
  UserOrderByInput: UserOrderByInput;
  UserRoleTypeNullableFilter: UserRoleTypeNullableFilter;
  UserUpdateArgs: UserUpdateArgs;
  UserUpdateInput: UserUpdateInput;
  UserWhereInput: UserWhereInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
};

export type AuthenticatedItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticatedItem'] = ResolversParentTypes['AuthenticatedItem']> = {
  __resolveType: TypeResolveFn<'User', ParentType, ContextType>;
};

export type ContactSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactSubmission'] = ResolversParentTypes['ContactSubmission']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type KeystoneAdminMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminMeta'] = ResolversParentTypes['KeystoneAdminMeta']> = {
  list?: Resolver<Maybe<ResolversTypes['KeystoneAdminUIListMeta']>, ParentType, ContextType, RequireFields<KeystoneAdminMetaListArgs, 'key'>>;
  lists?: Resolver<Array<ResolversTypes['KeystoneAdminUIListMeta']>, ParentType, ContextType>;
};

export type KeystoneAdminUiFieldGroupMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIFieldGroupMeta'] = ResolversParentTypes['KeystoneAdminUIFieldGroupMeta']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['KeystoneAdminUIFieldMeta']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type KeystoneAdminUiFieldMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIFieldMeta'] = ResolversParentTypes['KeystoneAdminUIFieldMeta']> = {
  createView?: Resolver<ResolversTypes['KeystoneAdminUIFieldMetaCreateView'], ParentType, ContextType>;
  customViewsIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fieldMeta?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  isFilterable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isNonNull?: Resolver<Maybe<Array<ResolversTypes['KeystoneAdminUIFieldMetaIsNonNull']>>, ParentType, ContextType>;
  isOrderable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  itemView?: Resolver<Maybe<ResolversTypes['KeystoneAdminUIFieldMetaItemView']>, ParentType, ContextType, Partial<KeystoneAdminUiFieldMetaItemViewArgs>>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listView?: Resolver<ResolversTypes['KeystoneAdminUIFieldMetaListView'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  search?: Resolver<Maybe<ResolversTypes['QueryMode']>, ParentType, ContextType>;
  viewsIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type KeystoneAdminUiFieldMetaCreateViewResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIFieldMetaCreateView'] = ResolversParentTypes['KeystoneAdminUIFieldMetaCreateView']> = {
  fieldMode?: Resolver<ResolversTypes['KeystoneAdminUIFieldMetaCreateViewFieldMode'], ParentType, ContextType>;
};

export type KeystoneAdminUiFieldMetaItemViewResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIFieldMetaItemView'] = ResolversParentTypes['KeystoneAdminUIFieldMetaItemView']> = {
  fieldMode?: Resolver<Maybe<ResolversTypes['KeystoneAdminUIFieldMetaItemViewFieldMode']>, ParentType, ContextType>;
  fieldPosition?: Resolver<Maybe<ResolversTypes['KeystoneAdminUIFieldMetaItemViewFieldPosition']>, ParentType, ContextType>;
};

export type KeystoneAdminUiFieldMetaListViewResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIFieldMetaListView'] = ResolversParentTypes['KeystoneAdminUIFieldMetaListView']> = {
  fieldMode?: Resolver<ResolversTypes['KeystoneAdminUIFieldMetaListViewFieldMode'], ParentType, ContextType>;
};

export type KeystoneAdminUiGraphQlResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIGraphQL'] = ResolversParentTypes['KeystoneAdminUIGraphQL']> = {
  names?: Resolver<ResolversTypes['KeystoneAdminUIGraphQLNames'], ParentType, ContextType>;
};

export type KeystoneAdminUiGraphQlNamesResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIGraphQLNames'] = ResolversParentTypes['KeystoneAdminUIGraphQLNames']> = {
  createInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createManyMutationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createMutationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleteManyMutationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleteMutationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemQueryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listOrderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listQueryCountName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listQueryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outputTypeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relateToManyForCreateInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relateToManyForUpdateInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relateToOneForCreateInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relateToOneForUpdateInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateManyInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateManyMutationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateMutationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  whereInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  whereUniqueInputName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type KeystoneAdminUiListMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUIListMeta'] = ResolversParentTypes['KeystoneAdminUIListMeta']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['KeystoneAdminUIFieldMeta']>, ParentType, ContextType>;
  graphql?: Resolver<ResolversTypes['KeystoneAdminUIGraphQL'], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['KeystoneAdminUIFieldGroupMeta']>, ParentType, ContextType>;
  hideCreate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hideDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  initialColumns?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  initialSearchFields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  initialSort?: Resolver<Maybe<ResolversTypes['KeystoneAdminUISort']>, ParentType, ContextType>;
  isHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSingleton?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  itemQueryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  labelField?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listQueryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plural?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  singular?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type KeystoneAdminUiSortResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneAdminUISort'] = ResolversParentTypes['KeystoneAdminUISort']> = {
  direction?: Resolver<ResolversTypes['KeystoneAdminUISortDirection'], ParentType, ContextType>;
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type KeystoneMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeystoneMeta'] = ResolversParentTypes['KeystoneMeta']> = {
  adminMeta?: Resolver<ResolversTypes['KeystoneAdminMeta'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  authenticateUserWithPassword?: Resolver<Maybe<ResolversTypes['UserAuthenticationWithPasswordResult']>, ParentType, ContextType, RequireFields<MutationAuthenticateUserWithPasswordArgs, 'email' | 'password'>>;
  createContactSubmission?: Resolver<Maybe<ResolversTypes['ContactSubmission']>, ParentType, ContextType, RequireFields<MutationCreateContactSubmissionArgs, 'data'>>;
  createContactSubmissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContactSubmission']>>>, ParentType, ContextType, RequireFields<MutationCreateContactSubmissionsArgs, 'data'>>;
  createInitialUser?: Resolver<ResolversTypes['UserAuthenticationWithPasswordSuccess'], ParentType, ContextType, RequireFields<MutationCreateInitialUserArgs, 'data'>>;
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'data'>>;
  createPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<MutationCreatePostsArgs, 'data'>>;
  createTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'data'>>;
  createTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType, RequireFields<MutationCreateTagsArgs, 'data'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<MutationCreateUsersArgs, 'data'>>;
  deleteContactSubmission?: Resolver<Maybe<ResolversTypes['ContactSubmission']>, ParentType, ContextType, RequireFields<MutationDeleteContactSubmissionArgs, 'where'>>;
  deleteContactSubmissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContactSubmission']>>>, ParentType, ContextType, RequireFields<MutationDeleteContactSubmissionsArgs, 'where'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'where'>>;
  deletePosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<MutationDeletePostsArgs, 'where'>>;
  deleteTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'where'>>;
  deleteTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType, RequireFields<MutationDeleteTagsArgs, 'where'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'where'>>;
  deleteUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<MutationDeleteUsersArgs, 'where'>>;
  endSession?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLogMessageArgs, 'message'>>;
  updateContactSubmission?: Resolver<Maybe<ResolversTypes['ContactSubmission']>, ParentType, ContextType, RequireFields<MutationUpdateContactSubmissionArgs, 'data' | 'where'>>;
  updateContactSubmissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContactSubmission']>>>, ParentType, ContextType, RequireFields<MutationUpdateContactSubmissionsArgs, 'data'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'data' | 'where'>>;
  updatePosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<MutationUpdatePostsArgs, 'data'>>;
  updateTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'data' | 'where'>>;
  updateTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType, RequireFields<MutationUpdateTagsArgs, 'data'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data' | 'where'>>;
  updateUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<MutationUpdateUsersArgs, 'data'>>;
};

export type PasswordStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['PasswordState'] = ResolversParentTypes['PasswordState']> = {
  isSet?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType, RequireFields<PostTagsArgs, 'orderBy' | 'skip' | 'where'>>;
  tagsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<PostTagsCountArgs, 'where'>>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authenticatedItem?: Resolver<Maybe<ResolversTypes['AuthenticatedItem']>, ParentType, ContextType>;
  contactSubmission?: Resolver<Maybe<ResolversTypes['ContactSubmission']>, ParentType, ContextType, RequireFields<QueryContactSubmissionArgs, 'where'>>;
  contactSubmissions?: Resolver<Maybe<Array<ResolversTypes['ContactSubmission']>>, ParentType, ContextType, RequireFields<QueryContactSubmissionsArgs, 'orderBy' | 'skip' | 'where'>>;
  contactSubmissionsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryContactSubmissionsCountArgs, 'where'>>;
  helloWorld?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keystone?: Resolver<ResolversTypes['KeystoneMeta'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'where'>>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType, RequireFields<QueryPostsArgs, 'orderBy' | 'skip' | 'where'>>;
  postsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryPostsCountArgs, 'where'>>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagArgs, 'where'>>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'orderBy' | 'skip' | 'where'>>;
  tagsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryTagsCountArgs, 'where'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'orderBy' | 'skip' | 'where'>>;
  usersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryUsersCountArgs, 'where'>>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType, RequireFields<TagPostsArgs, 'orderBy' | 'skip' | 'where'>>;
  postsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<TagPostsCountArgs, 'where'>>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['PasswordState']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRoleType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthenticationWithPasswordFailureResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAuthenticationWithPasswordFailure'] = ResolversParentTypes['UserAuthenticationWithPasswordFailure']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAuthenticationWithPasswordResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAuthenticationWithPasswordResult'] = ResolversParentTypes['UserAuthenticationWithPasswordResult']> = {
  __resolveType: TypeResolveFn<'UserAuthenticationWithPasswordFailure' | 'UserAuthenticationWithPasswordSuccess', ParentType, ContextType>;
};

export type UserAuthenticationWithPasswordSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAuthenticationWithPasswordSuccess'] = ResolversParentTypes['UserAuthenticationWithPasswordSuccess']> = {
  item?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  sessionToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthenticatedItem?: AuthenticatedItemResolvers<ContextType>;
  ContactSubmission?: ContactSubmissionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  KeystoneAdminMeta?: KeystoneAdminMetaResolvers<ContextType>;
  KeystoneAdminUIFieldGroupMeta?: KeystoneAdminUiFieldGroupMetaResolvers<ContextType>;
  KeystoneAdminUIFieldMeta?: KeystoneAdminUiFieldMetaResolvers<ContextType>;
  KeystoneAdminUIFieldMetaCreateView?: KeystoneAdminUiFieldMetaCreateViewResolvers<ContextType>;
  KeystoneAdminUIFieldMetaItemView?: KeystoneAdminUiFieldMetaItemViewResolvers<ContextType>;
  KeystoneAdminUIFieldMetaListView?: KeystoneAdminUiFieldMetaListViewResolvers<ContextType>;
  KeystoneAdminUIGraphQL?: KeystoneAdminUiGraphQlResolvers<ContextType>;
  KeystoneAdminUIGraphQLNames?: KeystoneAdminUiGraphQlNamesResolvers<ContextType>;
  KeystoneAdminUIListMeta?: KeystoneAdminUiListMetaResolvers<ContextType>;
  KeystoneAdminUISort?: KeystoneAdminUiSortResolvers<ContextType>;
  KeystoneMeta?: KeystoneMetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PasswordState?: PasswordStateResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAuthenticationWithPasswordFailure?: UserAuthenticationWithPasswordFailureResolvers<ContextType>;
  UserAuthenticationWithPasswordResult?: UserAuthenticationWithPasswordResultResolvers<ContextType>;
  UserAuthenticationWithPasswordSuccess?: UserAuthenticationWithPasswordSuccessResolvers<ContextType>;
};

