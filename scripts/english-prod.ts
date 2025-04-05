import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database for English learning...");

    // Delete all existing data
    // await Promise.all([
    //   db.delete(schema.userProgress),
    //   db.delete(schema.challenges),
    //   db.delete(schema.units),
    //   db.delete(schema.lessons),
    //   db.delete(schema.courses),
    //   db.delete(schema.challengeOptions),
    //   db.delete(schema.userSubscription),
    // ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "English", imageSrc: "/en.svg" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Vocabulary Basics", order: 1 },
            { unitId: unit.id, title: "Verb Tenses", order: 2 },
            { unitId: unit.id, title: "Common Phrases", order: 3 },
            { unitId: unit.id, title: "Sentence Structure", order: 4 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "apple"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "run"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"The boy is running."',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "cat"?',
                order: 4,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "apple",
                  imageSrc: "/apple.svg",
                  audioSrc: "/en_apple.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "banana",
                  imageSrc: "/banana.svg",
                  audioSrc: "/en_banana.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "grape",
                  imageSrc: "/grape.svg",
                  audioSrc: "/en_grape.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "run",
                  imageSrc: "/run.svg",
                  audioSrc: "/en_run.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "walk",
                  imageSrc: "/walk.svg",
                  audioSrc: "/en_walk.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "jump",
                  imageSrc: "/jump.svg",
                  audioSrc: "/en_jump.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "The boy is running.",
                  audioSrc: "/en_boy_running.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "The boy is walking.",
                  audioSrc: "/en_boy_walking.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "The boy is jumping.",
                  audioSrc: "/en_boy_jumping.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "cat",
                  imageSrc: "/cat.svg",
                  audioSrc: "/en_cat.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "dog",
                  imageSrc: "/dog.svg",
                  audioSrc: "/en_dog.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "bird",
                  imageSrc: "/bird.svg",
                  audioSrc: "/en_bird.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("English learning database seeded successfully!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed English learning database");
  }
};

void main();
