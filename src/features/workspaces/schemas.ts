import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  /**
   * image 字段的验证规则如下：
      z.union：表示 image 可以是多种类型之一。
      z.instanceof(File)：检查 image 是否是 File 类型的实例（通常用于文件上传）。
      z.string().transform(...)：检查 image 是否是字符串类型，并通过 transform 方法对字符串进行处理。
      如果字符串为空（""），则将其转换为 undefined。
      否则，保留原值。W
      .optional()：表示 image 字段是可选的，可以不存在或为 undefined。
   */
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  //更新的时候可以让名字为undefined，我们通过判断undefined来判定用户是否选择跳过
  name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
