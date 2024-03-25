/*
  Warnings:

  - You are about to drop the column `isComplite` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('toDo', 'planned', 'inProgress', 'closed');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isComplite",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'toDo';
