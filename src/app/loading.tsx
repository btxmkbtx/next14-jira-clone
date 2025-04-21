"use client";

import { Loader } from "lucide-react";

//这个加载页面组件会被子page目录下的loading.tsx文件覆盖
const LoadingPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingPage;
