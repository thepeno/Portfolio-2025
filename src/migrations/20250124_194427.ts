import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_type" AS ENUM('caseStudy', 'centered');
  CREATE TYPE "public"."enum__pages_v_blocks_content_type" AS ENUM('caseStudy', 'centered');
  CREATE TYPE "public"."enum_case_studies_hero_type" AS ENUM('none', 'caseStudyHero');
  CREATE TYPE "public"."enum_case_studies_blocks_content_type" AS ENUM('caseStudy', 'centered');
  CREATE TYPE "public"."enum_case_studies_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_case_studies_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_version_hero_type" AS ENUM('none', 'caseStudyHero');
  CREATE TYPE "public"."enum__case_studies_v_blocks_content_type" AS ENUM('caseStudy', 'centered');
  CREATE TYPE "public"."enum__case_studies_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__case_studies_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__case_studies_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_hero_type" AS ENUM('none', 'caseStudyHero');
  CREATE TYPE "public"."enum_projects_blocks_content_type" AS ENUM('caseStudy', 'centered');
  CREATE TYPE "public"."enum_projects_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_projects_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_projects_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_hero_type" AS ENUM('none', 'caseStudyHero');
  CREATE TYPE "public"."enum__projects_v_blocks_content_type" AS ENUM('caseStudy', 'centered');
  CREATE TYPE "public"."enum__projects_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__projects_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__projects_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_header_nav_items_sub_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_post_highlight_highlighted_posts_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_hero_team_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_team_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_hero_team_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_case_studies_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_case_studies_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_case_studies_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_case_studies_blocks_content_type" DEFAULT 'caseStudy',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"height" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_case_studies_hero_type" DEFAULT 'caseStudyHero',
  	"hero_title" varchar,
  	"hero_role" varchar,
  	"hero_duration" varchar,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_case_studies_v_version_hero_team_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_case_studies_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__case_studies_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__case_studies_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__case_studies_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_case_studies_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__case_studies_v_blocks_content_type" DEFAULT 'caseStudy',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_case_studies_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_case_studies_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__case_studies_v_version_hero_type" DEFAULT 'caseStudyHero',
  	"version_hero_title" varchar,
  	"version_hero_role" varchar,
  	"version_hero_duration" varchar,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_case_studies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "projects_hero_team_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "projects_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_projects_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_projects_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_projects_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "projects_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_projects_blocks_content_type" DEFAULT 'caseStudy',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"height" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_projects_hero_type" DEFAULT 'caseStudyHero',
  	"hero_title" varchar,
  	"hero_role" varchar,
  	"hero_duration" varchar,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_version_hero_team_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__projects_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__projects_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__projects_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__projects_v_blocks_content_type" DEFAULT 'caseStudy',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__projects_v_version_hero_type" DEFAULT 'caseStudyHero',
  	"version_hero_title" varchar,
  	"version_hero_role" varchar,
  	"version_hero_duration" varchar,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "post_highlight_highlighted_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_post_highlight_highlighted_posts_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "post_highlight" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "post_highlight_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "pages_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "comments" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comments_fk";
  
  DROP INDEX IF EXISTS "pages_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_comments_id_idx";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'case-studies';
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'caseStudyHero';
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'case-studies';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'caseStudyHero';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "type" "enum_pages_blocks_content_type" DEFAULT 'caseStudy';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "height" numeric;
  ALTER TABLE "pages" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_role" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_duration" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "type" "enum__pages_v_blocks_content_type" DEFAULT 'caseStudy';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "caption" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "height" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_role" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_duration" varchar;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "header_nav_items" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "name" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_team_member" ADD CONSTRAINT "pages_hero_team_member_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_team_member" ADD CONSTRAINT "pages_hero_team_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_team_member" ADD CONSTRAINT "_pages_v_version_hero_team_member_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_team_member" ADD CONSTRAINT "_pages_v_version_hero_team_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_hero_team_member" ADD CONSTRAINT "case_studies_hero_team_member_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_hero_team_member" ADD CONSTRAINT "case_studies_hero_team_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_blocks_content_columns" ADD CONSTRAINT "case_studies_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_blocks_content" ADD CONSTRAINT "case_studies_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_blocks_media_block" ADD CONSTRAINT "case_studies_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_blocks_media_block" ADD CONSTRAINT "case_studies_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_populated_authors" ADD CONSTRAINT "case_studies_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_version_hero_team_member" ADD CONSTRAINT "_case_studies_v_version_hero_team_member_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_version_hero_team_member" ADD CONSTRAINT "_case_studies_v_version_hero_team_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_blocks_content_columns" ADD CONSTRAINT "_case_studies_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_blocks_content" ADD CONSTRAINT "_case_studies_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_blocks_media_block" ADD CONSTRAINT "_case_studies_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_blocks_media_block" ADD CONSTRAINT "_case_studies_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_version_populated_authors" ADD CONSTRAINT "_case_studies_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_hero_team_member" ADD CONSTRAINT "projects_hero_team_member_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_hero_team_member" ADD CONSTRAINT "projects_hero_team_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_blocks_content_columns" ADD CONSTRAINT "projects_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_blocks_content" ADD CONSTRAINT "projects_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_blocks_media_block" ADD CONSTRAINT "projects_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_blocks_media_block" ADD CONSTRAINT "projects_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_populated_authors" ADD CONSTRAINT "projects_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_version_hero_team_member" ADD CONSTRAINT "_projects_v_version_hero_team_member_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_version_hero_team_member" ADD CONSTRAINT "_projects_v_version_hero_team_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_blocks_content_columns" ADD CONSTRAINT "_projects_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_blocks_content" ADD CONSTRAINT "_projects_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_blocks_media_block" ADD CONSTRAINT "_projects_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_blocks_media_block" ADD CONSTRAINT "_projects_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_version_populated_authors" ADD CONSTRAINT "_projects_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_highlight_highlighted_posts" ADD CONSTRAINT "post_highlight_highlighted_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_highlight_highlighted_posts" ADD CONSTRAINT "post_highlight_highlighted_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_highlight"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_highlight_rels" ADD CONSTRAINT "post_highlight_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."post_highlight"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_highlight_rels" ADD CONSTRAINT "post_highlight_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_team_member_order_idx" ON "pages_hero_team_member" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_team_member_parent_id_idx" ON "pages_hero_team_member" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_team_member_image_idx" ON "pages_hero_team_member" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_team_member_order_idx" ON "_pages_v_version_hero_team_member" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_team_member_parent_id_idx" ON "_pages_v_version_hero_team_member" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_team_member_image_idx" ON "_pages_v_version_hero_team_member" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "case_studies_hero_team_member_order_idx" ON "case_studies_hero_team_member" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_hero_team_member_parent_id_idx" ON "case_studies_hero_team_member" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_hero_team_member_image_idx" ON "case_studies_hero_team_member" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_content_columns_order_idx" ON "case_studies_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_content_columns_parent_id_idx" ON "case_studies_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_content_order_idx" ON "case_studies_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_content_parent_id_idx" ON "case_studies_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_content_path_idx" ON "case_studies_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_media_block_order_idx" ON "case_studies_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_media_block_parent_id_idx" ON "case_studies_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_media_block_path_idx" ON "case_studies_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "case_studies_blocks_media_block_media_idx" ON "case_studies_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "case_studies_populated_authors_order_idx" ON "case_studies_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_populated_authors_parent_id_idx" ON "case_studies_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_hero_hero_media_idx" ON "case_studies" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "case_studies_rels_pages_id_idx" ON "case_studies_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "case_studies_rels_categories_id_idx" ON "case_studies_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "case_studies_rels_users_id_idx" ON "case_studies_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_hero_team_member_order_idx" ON "_case_studies_v_version_hero_team_member" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_hero_team_member_parent_id_idx" ON "_case_studies_v_version_hero_team_member" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_hero_team_member_image_idx" ON "_case_studies_v_version_hero_team_member" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_content_columns_order_idx" ON "_case_studies_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_content_columns_parent_id_idx" ON "_case_studies_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_content_order_idx" ON "_case_studies_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_content_parent_id_idx" ON "_case_studies_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_content_path_idx" ON "_case_studies_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_media_block_order_idx" ON "_case_studies_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_media_block_parent_id_idx" ON "_case_studies_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_media_block_path_idx" ON "_case_studies_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_blocks_media_block_media_idx" ON "_case_studies_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_populated_authors_order_idx" ON "_case_studies_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_populated_authors_parent_id_idx" ON "_case_studies_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_hero_version_hero_media_idx" ON "_case_studies_v" USING btree ("version_hero_media_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_meta_version_meta_image_idx" ON "_case_studies_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_autosave_idx" ON "_case_studies_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_pages_id_idx" ON "_case_studies_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_categories_id_idx" ON "_case_studies_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_case_studies_v_rels_users_id_idx" ON "_case_studies_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "projects_hero_team_member_order_idx" ON "projects_hero_team_member" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_hero_team_member_parent_id_idx" ON "projects_hero_team_member" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_hero_team_member_image_idx" ON "projects_hero_team_member" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "projects_blocks_content_columns_order_idx" ON "projects_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_blocks_content_columns_parent_id_idx" ON "projects_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_blocks_content_order_idx" ON "projects_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_blocks_content_parent_id_idx" ON "projects_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_blocks_content_path_idx" ON "projects_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_blocks_media_block_order_idx" ON "projects_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_blocks_media_block_parent_id_idx" ON "projects_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_blocks_media_block_path_idx" ON "projects_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_blocks_media_block_media_idx" ON "projects_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "projects_populated_authors_order_idx" ON "projects_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_populated_authors_parent_id_idx" ON "projects_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_hero_hero_media_idx" ON "projects" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "projects_rels_pages_id_idx" ON "projects_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "projects_rels_categories_id_idx" ON "projects_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "projects_rels_users_id_idx" ON "projects_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_hero_team_member_order_idx" ON "_projects_v_version_hero_team_member" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_hero_team_member_parent_id_idx" ON "_projects_v_version_hero_team_member" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_hero_team_member_image_idx" ON "_projects_v_version_hero_team_member" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_content_columns_order_idx" ON "_projects_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_content_columns_parent_id_idx" ON "_projects_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_content_order_idx" ON "_projects_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_content_parent_id_idx" ON "_projects_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_content_path_idx" ON "_projects_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_media_block_order_idx" ON "_projects_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_media_block_parent_id_idx" ON "_projects_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_media_block_path_idx" ON "_projects_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_projects_v_blocks_media_block_media_idx" ON "_projects_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_populated_authors_order_idx" ON "_projects_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_populated_authors_parent_id_idx" ON "_projects_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_hero_version_hero_media_idx" ON "_projects_v" USING btree ("version_hero_media_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_projects_v_rels_pages_id_idx" ON "_projects_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_rels_categories_id_idx" ON "_projects_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_rels_users_id_idx" ON "_projects_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_items_order_idx" ON "header_nav_items_sub_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_items_parent_id_idx" ON "header_nav_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "post_highlight_highlighted_posts_order_idx" ON "post_highlight_highlighted_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "post_highlight_highlighted_posts_parent_id_idx" ON "post_highlight_highlighted_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "post_highlight_highlighted_posts_image_idx" ON "post_highlight_highlighted_posts" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "post_highlight_rels_order_idx" ON "post_highlight_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "post_highlight_rels_parent_idx" ON "post_highlight_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "post_highlight_rels_path_idx" ON "post_highlight_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "post_highlight_rels_pages_id_idx" ON "post_highlight_rels" USING btree ("pages_id");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_case_studies_id_idx" ON "pages_rels" USING btree ("case_studies_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_case_studies_id_idx" ON "_pages_v_rels" USING btree ("case_studies_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_icon_idx" ON "header_nav_items" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "header" USING btree ("logo_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "comments_id";
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'caseStudyHero');
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('case-studies');
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_pages_blocks_archive_relation_to" USING "relation_to"::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'caseStudyHero');
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('case-studies');
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__pages_v_blocks_archive_relation_to" USING "relation_to"::"public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "comments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_email" varchar NOT NULL,
  	"post_id" integer NOT NULL,
  	"is_approved" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "pages_hero_team_member" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_team_member" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_hero_team_member" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_hero_team_member" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_hero_team_member" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_hero_team_member" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_sub_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_highlight_highlighted_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_highlight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_highlight_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_team_member" CASCADE;
  DROP TABLE "_pages_v_version_hero_team_member" CASCADE;
  DROP TABLE "case_studies_hero_team_member" CASCADE;
  DROP TABLE "case_studies_blocks_content_columns" CASCADE;
  DROP TABLE "case_studies_blocks_content" CASCADE;
  DROP TABLE "case_studies_blocks_media_block" CASCADE;
  DROP TABLE "case_studies_populated_authors" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_rels" CASCADE;
  DROP TABLE "_case_studies_v_version_hero_team_member" CASCADE;
  DROP TABLE "_case_studies_v_blocks_content_columns" CASCADE;
  DROP TABLE "_case_studies_v_blocks_content" CASCADE;
  DROP TABLE "_case_studies_v_blocks_media_block" CASCADE;
  DROP TABLE "_case_studies_v_version_populated_authors" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "_case_studies_v_rels" CASCADE;
  DROP TABLE "projects_hero_team_member" CASCADE;
  DROP TABLE "projects_blocks_content_columns" CASCADE;
  DROP TABLE "projects_blocks_content" CASCADE;
  DROP TABLE "projects_blocks_media_block" CASCADE;
  DROP TABLE "projects_populated_authors" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_hero_team_member" CASCADE;
  DROP TABLE "_projects_v_blocks_content_columns" CASCADE;
  DROP TABLE "_projects_v_blocks_content" CASCADE;
  DROP TABLE "_projects_v_blocks_media_block" CASCADE;
  DROP TABLE "_projects_v_version_populated_authors" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "header_nav_items_sub_items" CASCADE;
  DROP TABLE "post_highlight_highlighted_posts" CASCADE;
  DROP TABLE "post_highlight" CASCADE;
  DROP TABLE "post_highlight_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_case_studies_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_case_studies_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_case_studies_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_projects_fk";
  
  ALTER TABLE "header_nav_items" DROP CONSTRAINT "header_nav_items_icon_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_rels_case_studies_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_case_studies_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_case_studies_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_projects_id_idx";
  DROP INDEX IF EXISTS "header_nav_items_icon_idx";
  DROP INDEX IF EXISTS "header_logo_idx";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'posts';
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'posts';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact';
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comments_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "comments_post_idx" ON "comments" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "comments_created_at_idx" ON "comments" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "caption";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_role";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_duration";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "case_studies_id";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "caption";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_role";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_duration";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "case_studies_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "case_studies_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "projects_id";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "icon_id";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_id";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_pages_blocks_archive_relation_to" USING "relation_to"::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__pages_v_blocks_archive_relation_to" USING "relation_to"::"public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_content_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_type";
  DROP TYPE "public"."enum_case_studies_hero_type";
  DROP TYPE "public"."enum_case_studies_blocks_content_type";
  DROP TYPE "public"."enum_case_studies_blocks_content_columns_size";
  DROP TYPE "public"."enum_case_studies_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_case_studies_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_version_hero_type";
  DROP TYPE "public"."enum__case_studies_v_blocks_content_type";
  DROP TYPE "public"."enum__case_studies_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__case_studies_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__case_studies_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum_projects_hero_type";
  DROP TYPE "public"."enum_projects_blocks_content_type";
  DROP TYPE "public"."enum_projects_blocks_content_columns_size";
  DROP TYPE "public"."enum_projects_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_projects_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_hero_type";
  DROP TYPE "public"."enum__projects_v_blocks_content_type";
  DROP TYPE "public"."enum__projects_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__projects_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__projects_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_header_nav_items_sub_items_link_type";
  DROP TYPE "public"."enum_post_highlight_highlighted_posts_link_type";`)
}
