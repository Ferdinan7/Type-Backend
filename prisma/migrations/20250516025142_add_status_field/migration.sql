-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('ASSIGNED', 'TODO', 'COMPLETED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'ASSIGNED';
