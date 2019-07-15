CREATE TABLE IF NOT EXISTS "Users" (
	"email" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("email")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "Projects" (
	"id" TEXT NOT NULL UNIQUE,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "Projects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "Transcripts" (
	"id" serial NOT NULL UNIQUE,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"data" json NOT NULL,
	"speakers" json NOT NULL,
	"project_id" numeric NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "Transcripts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "Annotations" (
	"id" serial NOT NULL UNIQUE,
	"user_id" TEXT NOT NULL,
	"transcript_id" serial NOT NULL UNIQUE,
	"label_id" numeric NOT NULL,
	"time_start" numeric NOT NULL,
	"time_end" numeric NOT NULL,
	"description" TEXT NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "Annotations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "Paper_edits" (
	"id" serial NOT NULL UNIQUE,
	"title" TEXT NOT NULL,
	"desctiption" TEXT NOT NULL,
	"data" json NOT NULL,
	"project_id" serial NOT NULL UNIQUE,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "Paper_edits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "users_projects" (
	"id" serial NOT NULL,
	"user_id" TEXT NOT NULL UNIQUE,
	"project_id" numeric NOT NULL UNIQUE,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "users_projects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "users_transcripts" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"transcript_id" serial NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "users_transcripts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "users_paper_edits" (
	"id" serial NOT NULL,
	"user_id" text NOT NULL,
	"paper_edit_id" serial NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "users_paper_edits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "Media" (
	"id" serial NOT NULL UNIQUE,
	"transcript_id" numeric NOT NULL,
	"url" TEXT NOT NULL,
	"metadata" json NOT NULL,
	"original_file_name" TEXT NOT NULL,
	"audio_preview_url" TEXT NOT NULL,
	"video_preview_url" TEXT NOT NULL,
	CONSTRAINT "Media_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS "Labels" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"colour" TEXT NOT NULL,
	CONSTRAINT "Labels_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




-- TODO: Fix foreign key references - commands with *** are invalid
-- ***ALTER TABLE "Transcripts" ADD CONSTRAINT "Transcripts_fk0" FOREIGN KEY ("project_id") REFERENCES "Projects"("id");
--
-- ALTER TABLE "Annotations" ADD CONSTRAINT "Annotations_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("email");
-- ALTER TABLE "Annotations" ADD CONSTRAINT "Annotations_fk1" FOREIGN KEY ("transcript_id") REFERENCES "Transcripts"("id");
-- ***ALTER TABLE "Annotations" ADD CONSTRAINT "Annotations_fk2" FOREIGN KEY ("label_id") REFERENCES "Labels"("id");
--
-- ALTER TABLE "Paper_edits" ADD CONSTRAINT "Paper_edits_fk0" FOREIGN KEY ("project_id") REFERENCES "Projects"("id");
--
-- ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("email");
-- ***ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_fk1" FOREIGN KEY ("project_id") REFERENCES "Projects"("id");
--
-- ***ALTER TABLE "users_transcripts" ADD CONSTRAINT "users_transcripts_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("email");
-- ALTER TABLE "users_transcripts" ADD CONSTRAINT "users_transcripts_fk1" FOREIGN KEY ("transcript_id") REFERENCES "Transcripts"("id");
--
-- ***ALTER TABLE "users_paper_edits" ADD CONSTRAINT "users_paper_edits_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("email");
-- ALTER TABLE "users_paper_edits" ADD CONSTRAINT "users_paper_edits_fk1" FOREIGN KEY ("paper_edit_id") REFERENCES "Paper_edits"("id");
--
-- ***ALTER TABLE "Media" ADD CONSTRAINT "Media_fk0" FOREIGN KEY ("transcript_id") REFERENCES "Transcripts"("id");
