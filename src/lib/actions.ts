"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const WEIGHT_MIN = 1;
const WEIGHT_MAX = 10;
const DETAILS_TYPES = ["instagram", "yandex_maps", "other"] as const;

export type CreateItemState = { error?: string; success?: boolean };

export async function createItem(
  _prev: CreateItemState,
  formData: FormData
): Promise<CreateItemState> {
  const title = (formData.get("title") as string)?.trim();
  if (!title || title.length < 1) {
    return { error: "Введите название" };
  }

  const description = (formData.get("description") as string)?.trim() || null;
  const detailsType = (formData.get("detailsType") as string) || null;
  const detailsUrl = (formData.get("detailsUrl") as string)?.trim() || null;

  let weight = Number(formData.get("weight"));
  if (Number.isNaN(weight) || weight < WEIGHT_MIN || weight > WEIGHT_MAX) {
    return { error: `Вес должен быть от ${WEIGHT_MIN} до ${WEIGHT_MAX}` };
  }
  weight = Math.round(weight);

  if (detailsType && !DETAILS_TYPES.includes(detailsType as (typeof DETAILS_TYPES)[number])) {
    return { error: "Недопустимый тип ссылки" };
  }

  await prisma.todoItem.create({
    data: {
      title,
      description: description || undefined,
      detailsType: detailsType || undefined,
      detailsUrl: detailsUrl || undefined,
      weight,
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function toggleComplete(id: string): Promise<void> {
  const item = await prisma.todoItem.findUnique({ where: { id } });
  if (!item) return;

  await prisma.todoItem.update({
    where: { id },
    data: {
      completed: !item.completed,
      completedAt: !item.completed ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath(`/item/${id}`);
}

export async function deleteItem(id: string): Promise<void> {
  await prisma.todoItem.delete({ where: { id } }).catch(() => {});
  revalidatePath("/");
  revalidatePath(`/item/${id}`);
}

export type UpdateItemState = { error?: string; success?: boolean };

export async function updateItem(
  _prev: UpdateItemState,
  formData: FormData
): Promise<UpdateItemState> {
  const id = formData.get("id") as string;
  if (!id) {
    return { error: "ID не указан" };
  }

  const title = (formData.get("title") as string)?.trim();
  if (!title || title.length < 1) {
    return { error: "Введите название" };
  }

  const description = (formData.get("description") as string)?.trim() || null;
  const detailsType = (formData.get("detailsType") as string) || null;
  const detailsUrl = (formData.get("detailsUrl") as string)?.trim() || null;

  let weight = Number(formData.get("weight"));
  if (Number.isNaN(weight) || weight < WEIGHT_MIN || weight > WEIGHT_MAX) {
    return { error: `Вес должен быть от ${WEIGHT_MIN} до ${WEIGHT_MAX}` };
  }
  weight = Math.round(weight);

  if (detailsType && !DETAILS_TYPES.includes(detailsType as (typeof DETAILS_TYPES)[number])) {
    return { error: "Недопустимый тип ссылки" };
  }

  await prisma.todoItem.update({
    where: { id },
    data: {
      title,
      description: description || null,
      detailsType: detailsType || null,
      detailsUrl: detailsUrl || null,
      weight,
    },
  });

  revalidatePath("/");
  revalidatePath(`/item/${id}`);
  return { success: true };
}
