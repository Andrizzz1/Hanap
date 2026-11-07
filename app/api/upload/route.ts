import { createHash, randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth/auth";


const mascots = ["fox", "glasses", "cap", "pug", "cat", "ballerina"];

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
    query: { disableCookieCache: true },
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // A safe folder name unique to this user.
  const owner = createHash("sha256")
    .update(session.user.id)
    .digest("hex");

  const directory = path.join(process.cwd(), "public", "uploads", owner);
  const urlPrefix = `/uploads/${owner}/`;

  async function removeOwnedImage(url: string | null | undefined) {
    if (!url?.startsWith(urlPrefix)) return;

    const filename = url.slice(urlPrefix.length);

    // Only delete generated image filenames directly inside this folder.
    if (!/^[0-9a-f-]{36}\.(jpg|png|webp)$/.test(filename)) return;

    try {
      await unlink(path.join(directory, filename));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.error("Could not delete profile image:", error);
      }
    }
  }

  let uploadedUrl: string | undefined;

  try {
    const formData = await request.formData();
    const file = formData.get("image");
    const mascot = formData.get("mascot");

    let nextImage: string;

    if (typeof mascot === "string" && mascots.includes(mascot)) {
      nextImage = mascot;
    } else {
      if (!(file instanceof File)) {
        return Response.json(
          { error: "Select an image or mascot" },
          { status: 400 },
        );
      }

      const extensions: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
      };

      const extension = extensions[file.type];

      if (!extension || file.size === 0 || file.size > 5 * 1024 * 1024) {
        return Response.json(
          { error: "Use a JPG, PNG, or WebP under 5 MB" },
          { status: 400 },
        );
      }

      const filename = `${randomUUID()}.${extension}`;

      await mkdir(directory, { recursive: true });

      uploadedUrl = `${urlPrefix}${filename}`;

      await writeFile(
        path.join(directory, filename),
        Buffer.from(await file.arrayBuffer()),
      );

      nextImage = uploadedUrl;
    }

    // Save the replacement before deleting the previous file.
    await auth.api.updateUser({
      headers: request.headers,
      body: { image: nextImage },
    });

    await removeOwnedImage(session.user.image);

    return Response.json({ url: nextImage });
  } catch (error) {
    // Remove the new upload if saving the profile failed.
    await removeOwnedImage(uploadedUrl);

    console.error(error);

    return Response.json(
      { error: "Could not update profile picture" },
      { status: 500 },
    );
  }
}