CREATE TABLE "projectsTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"my_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slides" json NOT NULL,
	"outlines" varchar,
	"thumbnail" varchar,
	"varient_id" varchar,
	"theme_name" varchar DEFAULT 'light',
	"is_deleted" boolean DEFAULT false,
	"is_sellable" boolean DEFAULT false,
	CONSTRAINT "projectsTable_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "usersTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"profile_url" text,
	"subscription" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"payment_api_id" varchar,
	"store_id" varchar,
	"web_hook_id" varchar,
	CONSTRAINT "usersTable_id_unique" UNIQUE("id"),
	CONSTRAINT "usersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "projectsTable" ADD CONSTRAINT "projectsTable_my_id_usersTable_id_fk" FOREIGN KEY ("my_id") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;