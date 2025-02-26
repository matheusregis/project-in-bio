"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";
import { randomUUID } from "crypto";

export async function createProject(formData: FormData) {
    const session = await auth();
    if (!session) return;

    const projectId = formData.get("profileId") as string;
    const projectName = formData.get("projectName") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const projectUrl = formData.get("projectUrl") as string;
    const file = formData.get("file") as File;

    const generateId = randomUUID();
    const storageRef = storage.file(`projects-images/${projectId}/${generateId}`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await storageRef.save(buffer);

    const imagePath = storageRef.name;

    try {
        await db.collection("projects").doc(projectId).collection("projects").doc(generateId).set({
            userId: session.user?.id,
            projectName,
            projectDescription,
            projectUrl,
            imagePath,
            createdAt: Timestamp.now().toMillis(),
        })
        return true;
    } catch (error) {
        return false;
    }
}