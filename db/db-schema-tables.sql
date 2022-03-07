CREATE TABLE "envelopes" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "balance" int NOT NULL
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "deduction" boolean NOT NULL,
  "source" varchar NOT NULL,
  "amount" int NOT NULL,
  "envelope_id" int NOT NULL,
  "description" varchar,
  "datetime" timestamp NOT NULL
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");
