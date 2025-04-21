import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export function snakeCaseToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()); /**
    / /g：正则表达式的开始/结束符，g 表示全局匹配（匹配所有符合条件的位置）。
    \b：单词边界（零宽度断言），匹配单词的开始或结束位置（如空格、标点或字符串开头/结尾）。
    \w：匹配任意单词字符（等价于 [a-zA-Z0-9_]）。
     */
}
