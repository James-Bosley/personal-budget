CREATE TABLE "envelopes" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "balance" money
);

CREATE TABLE "transactions" (
  "id" int PRIMARY KEY,
  "deduction" boolean,
  "source" varchar,
  "amount" money,
  "envelope_id" int,
  "description" varchar,
  "datetime" timestamp
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");
