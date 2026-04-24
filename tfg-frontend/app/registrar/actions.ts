'use server'
import { revalidatePath } from 'next/cache';

export async function revalidarMapas() {
    revalidatePath('/visualizar/mapas');
}

export async function revalidarGraficos() {
    revalidatePath('/visualizar/graficos');
}