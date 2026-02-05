import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/db";

// Папка для хранения фото
const UPLOADS_DIR = process.env.UPLOADS_DIR || join(process.cwd(), "uploads");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const todoItemId = formData.get("todoItemId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не выбран" }, { status: 400 });
    }

    if (!todoItemId) {
      return NextResponse.json({ error: "Не указан ID задачи" }, { status: 400 });
    }

    // Проверяем, что задача существует и выполнена
    const todoItem = await prisma.todoItem.findUnique({
      where: { id: todoItemId },
    });

    if (!todoItem) {
      return NextResponse.json({ error: "Задача не найдена" }, { status: 404 });
    }

    if (!todoItem.completed) {
      return NextResponse.json(
        { error: "Фото можно добавлять только к выполненным задачам" },
        { status: 400 }
      );
    }

    // Проверяем тип файла
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Разрешены только изображения (JPEG, PNG, WebP, GIF)" },
        { status: 400 }
      );
    }

    // Ограничение размера — 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Максимальный размер файла — 10MB" },
        { status: 400 }
      );
    }

    // Создаём папку uploads если её нет
    await mkdir(UPLOADS_DIR, { recursive: true });

    // Генерируем уникальное имя файла
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${todoItemId}-${Date.now()}.${ext}`;
    const filepath = join(UPLOADS_DIR, filename);

    // Сохраняем файл
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Сохраняем запись в БД
    const photo = await prisma.photo.create({
      data: {
        filename,
        todoItemId,
      },
    });

    return NextResponse.json({ success: true, photo });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки файла" },
      { status: 500 }
    );
  }
}
