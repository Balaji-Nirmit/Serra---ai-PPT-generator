import { pgTable, uuid, varchar, date, text, boolean, timestamp, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable('usersTable', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  profileUrl: text('profile_url'),
  subsciption: boolean('subscription').default(false),
  createdAt: timestamp('created_at',{ withTimezone: true}).notNull().defaultNow(),
  updatedAt: timestamp('updated_at',{ withTimezone: true}).notNull().defaultNow(),
  paymentApiId: varchar('payment_api_id'),
  storeId: varchar('store_id'),
  webHookId: varchar('web_hook_id')
})

export const projectsTable = pgTable('projectsTable',{
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  userId: uuid('my_id').notNull().references(()=>usersTable.id),
  title: varchar('title').notNull(),
  createdAt: timestamp('created_at',{ withTimezone: true}).notNull().defaultNow(),
  updatedAt: timestamp('updated_at',{ withTimezone: true}).notNull().defaultNow(),
  slides: json('slides'),
  outlines: text('outlines').array(),
  thumbnail: varchar('thumbnail'),
  varientId: varchar('varient_id'),
  themeName: varchar('theme_name').default('light'),
  isDeleted: boolean('is_deleted').default(false),
  isSellable: boolean('is_sellable').default(false)
})